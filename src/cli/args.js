const parseArgs = () => {
    const args = process.argv.slice(2); // Skip node executable and script path
    let result = [];

    for (let i = 0; i < args.length; i += 2) {
        const propName = args[i].startsWith('--') ? args[i].substring(2) : args[i];
        const value = args[i + 1];
        result.push(`${propName} is ${value}`);
    }

    console.log(result.join(', '));
};

parseArgs();