#!/usr/bin/env node

/**
 * todo-analyzer-auto.js
 *
 * Automated TODO.md analyzer for Malaysian Contractors Hub
 * Automatically detects and marks completed tasks without user interaction
 */

import fs from 'fs';
import path from 'path';

const TODO_PATH = path.resolve(process.cwd(), 'TODO.md');
const SRC_DIR = path.resolve(process.cwd(), 'src');

// Component mappings for better detection
const COMPONENT_MAPPINGS = {
  'power grid simulator': ['PowerGridSimulator.jsx', 'power-grid-simulator'],
  'smart compliance engine': ['SmartComplianceEngine.jsx', 'smart-compliance-engine'],
  'energy efficiency auditor': ['EnergyEfficiencyAuditor.jsx', 'energy-efficiency-auditor'],
  'hvac design calculator': ['HVACDesignCalculator.jsx', 'hvac-design-calculator'],
  'performance diagnostics': ['PerformanceDiagnostics.jsx', 'performance-diagnostics'],
  'indoor air quality dashboard': ['IndoorAirQualityDashboard.jsx', 'indoor-air-quality-dashboard'],
  'stormwater designer': ['StormwaterDesigner.jsx', 'stormwater-designer'],
  'flood risk analyzer': ['FloodRiskAnalyzer.jsx', 'flood-risk-analyzer'],
  'civil engineering': ['CivilEngineeringPage.jsx', 'civil-engineering'],
  'electrical systems': ['ElectricalSystemsPage.jsx', 'electrical-systems'],
  'sewerage drainage': ['SewerageDrainagePage.jsx', 'sewerage-drainage'],
  'elv systems': ['ELVSystemsPage.jsx', 'elv-systems'],
  'acmv systems': ['ACMVSystemsPage.jsx', 'acmv-systems'],
  'monsoon risk planner': ['MonsoonRiskPlanner.jsx', 'monsoon-planner'],
  'material alerts': ['MaterialAlerts.jsx', 'material-alerts'],
  'project bid engine': ['ProjectBidEngine.jsx', 'bid-engine'],
  'site management': ['SiteManagement.jsx', 'site-management'],
  'building automation': ['BuildingAutomation.jsx', 'building-automation'],
  'web3 demo': ['Web3DemoPage.jsx', 'web3-demo'],
  'database test': ['DatabaseTestPage.jsx', 'database-test'],
};

class AutoTodoAnalyzer {
  constructor() {
    this.todoContent = '';
    this.tasks = [];
    this.files = [];
    this.completedCount = 0;
    this.autoDetectedCount = 0;
  }

  initialize() {
    console.log('🔍 Initializing Auto TODO Analyzer...');
    this.todoContent = this.readTodoFile();
    this.tasks = this.parseTasks();
    this.files = this.listSourceFiles();
    console.log(`📊 Found ${this.tasks.length} tasks and ${this.files.length} source files`);
  }

  readTodoFile() {
    if (!fs.existsSync(TODO_PATH)) {
      throw new Error('TODO.md not found in project root');
    }
    return fs.readFileSync(TODO_PATH, 'utf-8');
  }

  writeTodoFile(content) {
    fs.writeFileSync(TODO_PATH, content, 'utf-8');
  }

  parseTasks() {
    const lines = this.todoContent.split(/\r?\n/);
    const tasks = [];
    let currentSection = null;
    let currentPriority = null;
    let currentPhase = null;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Track sections
      if (line.startsWith('## ')) {
        currentSection = line.replace('## ', '').trim();
        currentPriority = null;
        currentPhase = null;
      }

      // Track phases
      if (line.startsWith('### Phase ')) {
        currentPhase = line.replace('### Phase ', '').trim();
      }

      // Track priorities
      const priorityMatch = line.match(/Priority: (High|Medium|Low)/i);
      if (priorityMatch) {
        currentPriority = priorityMatch[1];
      }

      // Parse task lines
      const taskMatch = line.match(/^-\s*\[( |x)\]\s*(.+)$/);
      if (taskMatch) {
        tasks.push({
          lineIndex: i,
          completed: taskMatch[1] === 'x',
          text: taskMatch[2].trim(),
          section: currentSection,
          phase: currentPhase,
          priority: currentPriority,
          originalLine: line,
        });
      }
    }

    return tasks;
  }

  listSourceFiles() {
    const files = [];

    function walk(dir) {
      if (!fs.existsSync(dir)) return;

      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          walk(fullPath);
        } else if (entry.name.endsWith('.jsx') || entry.name.endsWith('.js')) {
          files.push(fullPath);
        }
      }
    }

    walk(SRC_DIR);
    return files;
  }

  taskMatchesComponent(taskText) {
    const lowerText = taskText.toLowerCase();

    // Check direct component mappings
    for (const [key, patterns] of Object.entries(COMPONENT_MAPPINGS)) {
      if (lowerText.includes(key)) {
        for (const pattern of patterns) {
          if (this.files.some(file => file.includes(pattern))) {
            return true;
          }
        }
      }
    }

    // Check for file existence in modules
    const moduleFiles = this.files.filter(file => file.includes('/modules/'));
    for (const file of moduleFiles) {
      const filename = path.basename(file, path.extname(file));
      if (lowerText.includes(filename.toLowerCase().replace(/([A-Z])/g, ' $1').trim())) {
        return true;
      }
    }

    return false;
  }

  analyzeTasks() {
    console.log('\n🔍 Analyzing tasks for completion...');

    const analysis = {
      completed: [],
      pending: [],
      autoDetected: [],
    };

    for (const task of this.tasks) {
      if (task.completed) {
        analysis.completed.push(task);
        continue;
      }

      const isPresent = this.taskMatchesComponent(task.text);

      if (isPresent) {
        console.log(`✅ Auto-detected completion: "${task.text}"`);
        task.completed = true;
        analysis.autoDetected.push(task);
        this.autoDetectedCount++;
      } else {
        analysis.pending.push(task);
      }
    }

    return analysis;
  }

  generateUpdatedTodo(analysis) {
    const lines = this.todoContent.split(/\r?\n/);

    // Clear all task lines
    for (const task of this.tasks) {
      lines[task.lineIndex] = null;
    }

    // Remove null lines and preserve structure
    const filteredLines = lines.filter(line => line !== null);

    // Add pending tasks organized by priority and phase
    this.addPendingTasksSection(filteredLines, analysis.pending);

    // Add completed tasks section
    this.addCompletedTasksSection(filteredLines, analysis.completed.concat(analysis.autoDetected));

    return filteredLines.join('\n');
  }

  addPendingTasksSection(lines, pendingTasks) {
    if (pendingTasks.length === 0) return;

    lines.push('');
    lines.push('## 📋 Pending Tasks');

    // Group by priority
    const byPriority = {};
    for (const task of pendingTasks) {
      const priority = task.priority || 'Unspecified';
      if (!byPriority[priority]) byPriority[priority] = [];
      byPriority[priority].push(task);
    }

    const priorityOrder = ['High', 'Medium', 'Low', 'Unspecified'];
    for (const priority of priorityOrder) {
      if (!byPriority[priority] || byPriority[priority].length === 0) continue;

      lines.push('');
      lines.push(`### Priority: ${priority}`);
      for (const task of byPriority[priority]) {
        lines.push(`- [ ] ${task.text}`);
      }
    }
  }

  addCompletedTasksSection(lines, completedTasks) {
    if (completedTasks.length === 0) return;

    lines.push('');
    lines.push('## ✅ Recently Completed Tasks');
    lines.push(`*Updated: ${new Date().toISOString().split('T')[0]}*`);
    lines.push('');

    for (const task of completedTasks) {
      lines.push(`- [x] ${task.text}`);
    }
  }

  run() {
    try {
      this.initialize();
      const analysis = this.analyzeTasks();
      const updatedContent = this.generateUpdatedTodo(analysis);

      this.writeTodoFile(updatedContent);

      console.log('\n🎉 TODO.md updated successfully!');
      console.log(`📊 Summary:`);
      console.log(`   ✅ Completed: ${analysis.completed.length + analysis.autoDetected.length}`);
      console.log(`   ⏳ Pending: ${analysis.pending.length}`);
      console.log(`   🔍 Auto-detected: ${analysis.autoDetected.length}`);

      if (this.autoDetectedCount > 0) {
        console.log(`\n📝 Auto-detected tasks marked as completed:`);
        analysis.autoDetected.forEach(task => {
          console.log(`   • ${task.text}`);
        });
      }

    } catch (error) {
      console.error('❌ Error:', error.message);
      process.exit(1);
    }
  }
}

// Run the analyzer
const analyzer = new AutoTodoAnalyzer();
analyzer.run();
