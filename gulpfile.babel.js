'use strict';

import appClean from './gulp/tasks/appClean';
import assets from './gulp/tasks/assets';
import browserSync from './gulp/tasks/browserSync';
import cacheClear from './gulp/tasks/cacheClear';
import fonts from './gulp/tasks/fonts';
import img from './gulp/tasks/img';
import imgClean from './gulp/tasks/imgClean';
import markup from './gulp/tasks/markup';
import markupLibs from './gulp/tasks/markupLibs';
import scripts from './gulp/tasks/scripts';
import styles from './gulp/tasks/styles';

import production from './gulp/tasks/build';
import development from './gulp/tasks/default';
import watch from './gulp/tasks/watch';

appClean();
cacheClear();
browserSync();
markup();
markupLibs();
styles();
scripts();
fonts();
imgClean();
img();
assets();

watch();

development();
production();
