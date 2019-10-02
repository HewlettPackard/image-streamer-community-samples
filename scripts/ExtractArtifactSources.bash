#!/bin/bash

# This script extracts Plan Scripts and Build Plans from the supplied
# artifact bundle and renames them with their meaningful
# names.
# In addition, it inserts the description of Plan Scripts at the very
# beginning of the source output file
#
# Typical invocation:
#     ./artifact-sources.bash ../artifacts-bundles/Didactic-Linux-MultiDistro-Artifact-Bundle-V0.3-FDZ.zip

# Version: 0.42

# Check argument(s)
NUM_ARG=1

if [ "$#" != "$NUM_ARG" ] ; then
   echo "Usage: $0 <artifact.zip>" 
   exit 1
fi

# Variables initialization
JQ=$(which jq 2> /dev/null)
UNZIP=$(which unzip 2> /dev/null)
ARTIFACT_PATH=$1
ARTIFACT_NAME=$(basename ${ARTIFACT_PATH})
ARTIFACT_BASENAME=$(basename $ARTIFACT_PATH '.zip')
ARTIFACT_DIR="${PWD}/$(dirname ${ARTIFACT_PATH})"

# Check Requirements

# jq and unzip must be present in the system
if [ -z $JQ ] ; then
   echo "jq not present in this system. Exiting..." 
   exit 2 
fi
if [ -z $UNZIP ] ; then
   echo "unzip not present in this system. Exiting..." 
   exit 2 
fi

# Verify ARTIFACT exists and is a real .zip file
if [[ ! -f $ARTIFACT_PATH || $(file $ARTIFACT_PATH | grep -q "Zip archive data") ]] ; then
   echo "Artifact file dos not exists or is not a .ZIP file" 
   echo "Exiting...." 
   exit 3
fi

# make sure where we are
cd ${ARTIFACT_DIR}
echo $PWD

# From there build the recipient paths
SRC_DIR="../src"
# ToDo: verify SRC_DIR exists
PlanScript_DIR=${SRC_DIR}/${ARTIFACT_BASENAME}/PlanScripts
BuildPlan_DIR=${SRC_DIR}/${ARTIFACT_BASENAME}/BuildPlans

# Create recipient directories and somehow cleanup
# to avoid interactive questions from unzip
mkdir -p ${SRC_DIR} >/dev/null 2>&1
cd ${SRC_DIR}
mkdir -p ${PlanScript_DIR} > /dev/null 2>&1
mkdir -p ${BuildPlan_DIR}  > /dev/null 2>&1
rm *.json SHA256SUM.sha256sum > /dev/null 2>&1

# unzip locally abruptly (overwrite existing files).
# ToDo: In case unzip fails, we should 
# print a meaningful message, remove ${SRC_DIR} created earlier
# and only then exit
$UNZIP -o ../artifact-bundles/$ARTIFACT_BASENAME -d . || \
	exit 1

# Create Plan Scripts and Build Plans lists
PS_LIST=$(ls *_planscript.json 2>/dev/null)
BP_LIST=$(ls *_buildplan.json 2>/dev/null)

# Move the Manifest file, containing the artifact description
# into a README.md filename
echo -e "# Artifact description and content\n" > ${ARTIFACT_BASENAME}/README.md
echo -e "## Description\n" >> ${ARTIFACT_BASENAME}/README.md
sed -e 's/$/\n/' MANIFEST.MF >> ${ARTIFACT_BASENAME}/README.md
echo >> ${ARTIFACT_BASENAME}/README.md
rm -f MANIFEST.MF > /dev/null 2>&1

# Extract script sources from the .json files
for f in $PS_LIST ; do
    PS_NAME=$($JQ  -r '.name' $f)
    echo "Extracting Plan Script $PS_NAME from $f"
    # Replace <spaces> char with "-" to avoid string manipulation problems
    PS_FILENAME=$($JQ  -r '.name' $f | tr ' ' "-")
    PS_ID=$($JQ  -r '.id' $f)

    # Insert PlanScript type and description at the beginning of PS sources
    # with lines starting with "# "
    PS_TYPE=$($JQ  -r '.planType' $f)
    PS_DESCRIPTION=$($JQ  -r '.description' $f)
    echo "# Plan Script Type: ${PS_TYPE}" > ${PlanScript_DIR}/${PS_FILENAME}
    echo "" >> ${PlanScript_DIR}/${PS_FILENAME}
    echo "# Plan Script Description:" >> ${PlanScript_DIR}/${PS_FILENAME}
    echo -e $PS_DESCRIPTION | fold -s | sed '1,$s/^/# /' >> ${PlanScript_DIR}/${PS_FILENAME}
    echo >> ${PlanScript_DIR}/${PS_FILENAME}
    echo "############" >> ${PlanScript_DIR}/${PS_FILENAME}

    PS_CONTENT=$($JQ  '.content' $f)
    # Need to remove manually surrounding quotes on line on first line and last line.
    echo -e $PS_CONTENT | sed '1s/^"// ; $s/"$// ; 1,$s/\\"/"/g' >> ${PlanScript_DIR}/${PS_FILENAME}
done

echo
# Extract Build Plan info from the .json files
for f in $BP_LIST ; do
    BP_NAME=$($JQ  -r '.name' $f) 
    echo "Extracting Build Plan $BP_NAME from $f"
    BP_FILENAME=$($JQ  -r '.name' $f | tr ' ' "-") 
    BP_ID=$($JQ  -r '.buildPlanid' $f)
    BP_DESCRIPTION=$($JQ  '.description' $f | tr --delete '"' )
    BP_TYPE=$($JQ '.oeBuildPlanType' $f  | tr --delete '"')
    BP_STEPS=$($JQ '.buildStep[]' $f | tr --delete '",' | \
	 awk -F: '/serialNumber/ {printf $NF "-"}; /planScriptName/ {print $NF}')
    BP_CUSTOM_ATTRIBUTES=$($JQ '.customAttributes' $f | tr --delete '[]')
    
    cat > ${BuildPlan_DIR}/${BP_FILENAME} << __EOF__
Build Plan properties summary


Name: $BP_NAME
Type: $BP_TYPE
ID  : $BP_ID
Description: $BP_DESCRIPTION

Steps:
$BP_STEPS

Custom Attributes:
$BP_CUSTOM_ATTRIBUTES



__EOF__
    #echo -e $BP_CONTENT | sed '1s/^"// ; $s/"$// ; 1,$s/\\"/"/g' > $BP_NAME
done

# Cleanup 
echo
echo "Cleanup"
rm *.json SHA256SUM.sha256sum > /dev/null 2>&1

exit 0


