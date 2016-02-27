#!/bin/bash

# [arg 1] is input file, complete path
# [arg 2] is output dir, complete path
# [arg 3] is output file, complete path

loffice --headless --convert-to odt --outdir $2 $1
w2l -ultraclean ${$1/'doc'/'odt'} ${$1/'doc'/'docx.tex'}