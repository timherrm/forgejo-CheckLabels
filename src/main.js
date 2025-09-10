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

        let result = false;
        if (operator === 'and') {
            result = check_labels.every(label => present_labels.includes(label));
        } else if (operator === 'or') {
            result = check_labels.some(label => present_labels.includes(label));
        } else {
            core.setFailed(`Unknown operator: ${operator}`);
            process.exit(1);
        }

        if (result) {
            core.setOutput('result', 'Labels matched');
            process.exit(0);
        } else {
            core.setFailed('Labels did not match');
            process.exit(1);
        }
    } catch (error) {
        core.setFailed(error.message);
        process.exit(1);
    }
}

run();