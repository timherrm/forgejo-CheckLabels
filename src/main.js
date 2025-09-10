const core = require('@actions/core');

async function run() {
    try {
        const check_labelsInput = core.getInput('check_labels');
        const present_labelsInput = core.getInput('present_labels');
        const operator = core.getInput('operator').toLowerCase();

        if (!check_labelsInput || !present_labelsInput) {
            core.setFailed('Both "labels" and "present_labels" inputs are required.');
            process.exit(1);
        }

        const check_labels = check_labelsInput.split(',').map(l => l.trim()).filter(Boolean);
        const present_labels = present_labelsInput.split(',').map(l => l.trim()).filter(Boolean);
        const debug = core.getInput('debug') === 'true';

        let result = false;
        if (operator === 'and') {
            result = check_labels.every(label => present_labels.includes(label));
        } else if (operator === 'or') {
            result = check_labels.some(label => present_labels.includes(label));
        } else {
            core.setFailed(`Unknown operator: ${operator}`);
            process.exit(1);
        }
        if (debug) {
            console.log('check_labels:', check_labels);
            console.log('present_labels:', present_labels);
            console.log('operator:', operator);
        }
        if (result) {
            core.setOutput('result', 'Labels matched');
        } else {
            core.setOutput('result', 'Labels did not match');
        }
    } catch (error) {
        core.setFailed(error.message);
        process.exit(1);
    }
}

run();