'use strict';

import assets from './gulp/tasks/subtasks/assets';
import browserSync from './gulp/tasks/subtasks/browserSync';
import {cleanApp, cleanCache} from './gulp/tasks/subtasks/clean';
import fonts from './gulp/tasks/subtasks/fonts';
import img from './gulp/tasks/subtasks/img';
import markup from './gulp/tasks/subtasks/markup';
import scripts from './gulp/tasks/subtasks/scripts';
import styles from './gulp/tasks/subtasks/styles';

import development from './gulp/tasks/default';
import production from './gulp/tasks/build';
import watch from './gulp/tasks/watch';

assets();
browserSync();
cleanApp();
cleanCache();
fonts();
img();
markup();
scripts();
styles();

watch();

development();
production();
