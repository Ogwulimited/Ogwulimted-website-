#!/bin/bash

# Target files
FILES="src/components/*.tsx src/App.tsx"

for file in $FILES; do
    echo "Processing $file"
    
    # Backgrounds
    sed -i 's/bg-white/bg-white dark:bg-[#121212]/g' $file
    sed -i 's/bg-\[\#F8F9FA\]/bg-\[\#F8F9FA\] dark:bg-\[\#1E1E1E\]/g' $file
    sed -i 's/bg-\[\#F1F3F4\]/bg-\[\#F1F3F4\] dark:bg-\[\#242424\]/g' $file
    
    # Text colors
    sed -i 's/text-\[\#202124\]/text-\[\#202124\] dark:text-\[\#E8EAED\]/g' $file
    sed -i 's/text-\[\#5F6368\]/text-\[\#5F6368\] dark:text-\[\#9AA0A6\]/g' $file
    sed -i 's/text-\[\#80868B\]/text-\[\#80868B\] dark:text-\[\#9AA0A6\]/g' $file
    
    # Borders
    sed -i 's/border-\[\#DADCE0\]/border-\[\#DADCE0\] dark:border-\[\#3C4043\]/g' $file
    
    # Special colored backgrounds
    sed -i 's/bg-\[\#E8F0FE\]/bg-\[\#E8F0FE\] dark:bg-\[\#1967D2\]\/20/g' $file
    sed -i 's/bg-\[\#FCE8E6\]/bg-\[\#FCE8E6\] dark:bg-\[\#C5221F\]\/20/g' $file
    sed -i 's/bg-\[\#FEF7E0\]/bg-\[\#FEF7E0\] dark:bg-\[\#E37400\]\/20/g' $file
    sed -i 's/bg-\[\#E6F4EA\]/bg-\[\#E6F4EA\] dark:bg-\[\#137333\]\/20/g' $file
    
    # Special colored text
    sed -i 's/text-\[\#1967D2\]/text-\[\#1967D2\] dark:text-\[\#8AB4F8\]/g' $file
    sed -i 's/text-\[\#C5221F\]/text-\[\#C5221F\] dark:text-\[\#F28B82\]/g' $file
    sed -i 's/text-\[\#E37400\]/text-\[\#E37400\] dark:text-\[\#FDD663\]/g' $file
    sed -i 's/text-\[\#137333\]/text-\[\#137333\] dark:text-\[\#81C995\]/g' $file

done

echo "Done!"
