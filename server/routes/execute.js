const express = require('express');
const router = express.Router();
const { VM } = require('vm2');

// Execute code safely
router.post('/', async (req, res) => {
  try {
    const { code, language } = req.body;

    if (language === 'html') {
      // Return HTML as-is for iframe execution
      res.json({ output: code, type: 'html' });
    } else if (language === 'javascript') {
      // Execute JavaScript in sandboxed VM
      try {
        const vm = new VM({
          timeout: 5000,
          sandbox: {
            console: {
              log: (...args) => {
                return args.join(' ');
              }
            }
          }
        });

        const result = vm.run(code);
        res.json({ output: String(result || ''), type: 'text' });
      } catch (error) {
        res.json({ output: `Error: ${error.message}`, type: 'error' });
      }
    } else if (language === 'python') {
      // Python execution would require a Python runtime
      // For now, return a message explaining this would run server-side
      res.json({
        output: 'Python execution requires server-side runtime. In production, this would use a containerized Python environment.',
        type: 'info'
      });
    } else if (language === 'java') {
      // Java execution would require JVM
      // For now, return a message explaining this would run server-side
      res.json({
        output: 'Java execution requires JVM runtime. In production, this would use a containerized Java environment.',
        type: 'info'
      });
    } else {
      res.status(400).json({ error: 'Unsupported language' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Execution failed' });
  }
});

module.exports = router;
