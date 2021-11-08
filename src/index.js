import { DOMTasks } from './dom';
import { Tasklist } from './tasks';
import { Events } from './events';
import './main.css';

// instantiate Tasklist, DOMTasks, and Events modules
const tasklist = Tasklist();
const dom = DOMTasks();
Events(dom, tasklist);