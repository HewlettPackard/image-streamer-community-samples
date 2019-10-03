#!/bin/bash

# Version 0.71

# This script generates the <ArtifactName>-README.md file 
# associated with each artifact bundle found in the 
# artifact-bundles directory. It overwrites any already existing 
# file. It must be ran after the ExtractArtifactSources.bash script.

# Check argument(s)
NUM_ARG=1

if [ "$#" != "$NUM_ARG" ] ; then
   echo "Usage: $0 <artifact directory>|<artifact bundle .zip file"
   echo
   echo "       where <artifact directory> represents the path" 
   echo "       to the directory containing the artifacts zip files,"
   echo "       and <artifact bundle .zip file> is an artifact bundle .zip file path"
   echo 
   echo "examples:"
   echo -e "\tProcess all the artifact bundles contained in directory ../artifact-bundles"
   echo -e "\t${0} ../artifact-bundles\n"
   echo -e "\tProcess the artifact bundle ../artifact-bundles/ArtifactBundle.zip"
   echo -e "\t${0} ../artifact-bundles/ArtifactBundle.zip\n"
   exit 1
fi
 
# Variables initialization
MyName=$(basename ${0})
ARTIFACT_LIST=""
ARTIFACT_DIR=""


if [ -d ${1} ] ; then
	ARTIFACT_DIR="$1"
fi
if [ -f ${1} ] ; then
	ARTIFACT_LIST="$(basename ${1%.zip})"
fi
[ -z $ARTIFACT_DIR ] && [ -z $ARTIFACT_LIST ] && {
	echo "$1 is neither a regular file nor a directory. Exiting"
	exit 3
	}

# Verify that ARTIFACT_DIR contains at least one valid bundle
if [ ! -z $ARTIFACT_DIR ] ; then
	cd $ARTIFACT_DIR
	ARTIFACT_SRC="${PWD}/../src"
	ARTIFACT_FILE_LIST="$(ls ${ARTIFACT_DIR}/*zip)"

	# extract only base with no .zip suffix
	for file in $ARTIFACT_FILE_LIST ; do
		ARTIFACT_LIST="$ARTIFACT_LIST $(basename $file .zip)"
	done

	if [ -z "${ARTIFACT_LIST}" ] ; then
		echo "Could not find any artifact bundle in ${ARTIFACT_DIR}. Exiting"
		exit 1
	fi
else 
	if [ ! -z $ARTIFACT_LIST ] ; then
		ARTIFACT_DIR=$(dirname $ARTIFACT_LIST)
		cd $ARTIFACT_DIR	
		ARTIFACT_SRC="${PWD}/../src"
	fi

fi

# Verify artifact sources are present
for artifact in $ARTIFACT_LIST ; do
	echo "Checking ${artifact}"
	# Verify that the sources have been extracted
	if [ ! -d ${ARTIFACT_SRC}/${artifact} ] ; then
		echo -e "\tCould not find artifact sources for $artifact"
		echo -e "\tMake sure to extract sources before running $MyName" 
	else
	NEW_ARTIFACT_LIST="${NEW_ARTIFACT_LIST} ${artifact}"
	fi
done
echo

if  [ -z "${NEW_ARTIFACT_LIST}" ] ; then
	echo -e "\nArtifact list is empty. Exiting..."
	exit 1
fi

for artifact in ${NEW_ARTIFACT_LIST} ; do
	echo "Processing ${artifact}"
	cd ${ARTIFACT_SRC}/${artifact}
	ARTIFACT_README="../${artifact}/README.md"


	# Verify BuildPlans directory exists
	if [ ! -d BuildPlans ] ; then
		echo -e "\tCannot find the ${artifact}/BuildPlans directory"
		echo -e "\tMake sure sources of ${artifact} have been correctly extracted."
		echo -e "\tExiting"
		exit 2
	fi

	# Processing Build Plans
	BUILDPLAN_LIST="$(ls BuildPlans)"
	echo "Build Plans"
	cd BuildPlans
	echo -e "## Build Plans description\n\nName | Type | Description | Steps\n-|-|-|-" \
		>> ../${ARTIFACT_README}
	for bp in ${BUILDPLAN_LIST} ; do
		echo -e "\tProcessing $bp"
		awk -F: '/^Name/ {N=$NF}
			/^Type/ {T=$NF}
			/^Description/ {D=$NF}
			/^ [1-9]/ { S=S $0 }
			END {print N, "|", T, "|", D, "|", S}' $bp >> ../${ARTIFACT_README}
	done
	echo

	cd ..
	echo -e "\n## Plan scripts description\n\nName | Type | Description\n-|-|-" \
		>> ${ARTIFACT_README}

	# Verify that the PlanScripts and the BuildPlans directory exists
	if [ ! -d PlanScripts ] ; then
		echo -e "\tCannot find the ${artifact}/PlanScripts directory"
		echo -e "\tMake sure sources of ${artifact} have been correctly extracted."
		echo -e "\tExiting"
		exit 2
	fi

	PLANSCRIPT_LIST="$(ls PlanScripts)"
	echo "Plan Scripts"
	cd PlanScripts
	for ps in $PLANSCRIPT_LIST ; do
		echo -e "\tProcessing $ps"
		awk -F'#' '/Type/ {N=split($0, a, " ") ; Type=a[N]}
			/############/ {exit}
			!/Description:/ && !/Plan Script Type:/ {Descr=Descr $NF}
			END {print FILENAME, "|", Type, "|", Descr}' $ps >> ../$ARTIFACT_README
	done
	echo
done


