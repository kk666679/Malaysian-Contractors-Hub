#!/usr/bin/env node

/**
 * update-todo.js
 *
 * CLI utility to analyze TODO.md in the Malaysian Contractors Hub project,
 * automatically mark tasks as completed based on codebase presence,
 * allow manual overrides, and generate a cleaned TODO.md with sorted tasks.
 *
 * Usage:
 *   node scripts/update-todo.js
 */

import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { execSync } from 'child_process';

const TODO_PATH = path.resolve(process.cwd(), 'TODO.md');
const SRC_DIR = path.resolve(process.cwd(), 'src/modules');

// Validate paths are within project directory
const PROJECT_ROOT = process.cwd();
if (!TODO_PATH.startsWith(PROJECT_ROOT) || !SRC_DIR.startsWith(PROJECT_ROOT)) {
  throw new Error('Invalid path detected - paths must be within project directory');
}

const TASK_REGEX = /^- \[( |x)\] (.+)$/;
const PRIORITY_REGEX = /Priority: (High|Medium|Low)/i;

function readTodoFile() {
  return fs.readFileSync(TODO_PATH, 'utf-8');
}

function writeTodoFile(content) {
  fs.writeFileSync(TODO_PATH, content, 'utf-8');
}

function listModuleFiles() {
  // Recursively list all files under src/modules
  const files = [];

  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else {
        files.push(fullPath);
      }
    }
  }

  walk(SRC_DIR);
  return files;
}

function normalizePath(p) {
  return p.replace(/\\/g, '/').toLowerCase();
}

function taskMatchesFile(task, files) {
  // Heuristic: check if task mentions a component or file that exists
  // Extract key words from task text
  const keywords = task.toLowerCase().match(/[a-z0-9\-]+/g) || [];
  for (const file of files) {
    const normalizedFile = normalizePath(file);
    let matchesAll = true;
    for (const kw of keywords) {
      if (!normalizedFile.includes(kw)) {
        matchesAll = false;
        break;
      }
    }
    if (matchesAll) return true;
  }
  return false;
}

function parseTasks(todoContent) {
  const lines = todoContent.split(/\r?\n/);
  const tasks = [];
  let currentSection = null;
  let currentPriority = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('## ')) {
      currentSection = line.trim();
      currentPriority = null;
    }
    if (line.match(PRIORITY_REGEX)) {
      const m = line.match(PRIORITY_REGEX);
      currentPriority = m ? m[1] : null;
    }
    const m = line.match(TASK_REGEX);
    if (m) {
      tasks.push({
        lineIndex: i,
        completed: m[1] === 'x',
        text: m[2],
        section: currentSection,
        priority: currentPriority,
      });
    }
  }
  return tasks;
}

async function promptUser(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise(resolve => {
    rl.question(question, answer => {
      rl.close();
      resolve(answer.trim().toLowerCase());
    });
  });
}

async function main() {
  console.log('Reading TODO.md...');
  const todoContent = readTodoFile();
  const tasks = parseTasks(todoContent);
  const files = listModuleFiles();

  console.log(`Found ${tasks.length} tasks in TODO.md.`);
  console.log(`Scanning ${files.length} source files in src/modules...`);

  const updatedTasks = [];

  for (const task of tasks) {
    const isPresent = taskMatchesFile(task.text, files);
    if (isPresent && !task.completed) {
      console.log(`Task likely completed: "${task.text}"`);
      const answer = await promptUser('Mark as completed? (y/n) ');
      if (answer === 'y' || answer === 'yes') {
        updatedTasks.push({ ...task, completed: true });
        continue;
      }
    }
    updatedTasks.push(task);
  }

  // Regenerate TODO.md content with completed tasks at bottom, sorted by priority
  const lines = todoContent.split(/\r?\n/);
  const completedTasks = updatedTasks.filter(t => t.completed);
  const pendingTasks = updatedTasks.filter(t => !t.completed);

  // Remove all task lines from original content
  for (const task of updatedTasks) {
    lines[task.lineIndex] = null;
  }

  // Filter out null lines
  const filteredLines = lines.filter(l => l !== null);

  // Append pending tasks grouped by priority
  const priorityOrder = ['High', 'Medium', 'Low', null];
  for (const priority of priorityOrder) {
    const tasksByPriority = pendingTasks.filter(t => t.priority === priority);
    if (tasksByPriority.length === 0) continue;
    filteredLines.push('');
    filteredLines.push(`## Pending Tasks${priority ? ` - Priority: ${priority}` : ''}`);
    for (const t of tasksByPriority) {
      filteredLines.push(`- [ ] ${t.text}`);
    }
  }

  // Append completed tasks at bottom
  filteredLines.push('');
  filteredLines.push('## ✅ Completed Tasks');
  for (const t of completedTasks) {
    filteredLines.push(`- [x] ${t.text}`);
  }

  const newContent = filteredLines.join('\n');
  writeTodoFile(newContent);

  console.log('TODO.md updated successfully.');
}

main().catch(err => {
  console.error('Error updating TODO.md:', err);
  process.exit(1);
});
