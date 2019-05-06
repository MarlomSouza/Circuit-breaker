const { delayedFunction } = require("./delayedFunction");
const circuitBreaker = require('opossum');

function setupCircuitBreaker() {
    const circuitBreakerOptions = {
        errorThresholdPercentage: 10,
        timeout: 1000,
        resetTimeout: 30000
    };
    const circuit = circuitBreaker(delayedFunction, circuitBreakerOptions);

    circuit.fallback((error) => {
        if (error){
            console.log(error.message)
            return error.message;
        }
        console.log("Fallback")
        return "Fallback";
        
    });
    console.log(circuit.status.stats);

    circuit.on('success', () => {
        console.log("Emitted when the circuit breaker action succeeds")
    });

    circuit.on('failure', () => {
        console.log("Emitted when the circuit breaker action fails")
    });

    circuit.on('fired', () => {
        console.log("emitted when the breaker is fired.");
    })

    circuit.on('halfOpen', () => {
        console.log('HALF OPEN: Circuit breaker is halfOpen');
    });
    circuit.on('open', () => {
        console.log('OPEN: Circuit breaker is open');
    });
    circuit.on('close', () => {
        console.log('CLOSED: Circuit breaker is clode, Service OK');
    });

    circuit.on('reject', () => {
        console.log('Emitted when the circuit breaker is open and failing fast, reject');
        console.log("emitted when the breaker is open (or halfOpen).")
    });

    circuit.on('timeout', () => {
        console.log('Emitted when the circuit breaker action takes longer than options.timeout');
    });

    circuit.on('snapshot', () => {
        console.log('mitted at each time-slice. Listeners for this event will receive a cumulative snapshot of the current status window.')
    })

    
    return circuit;
}

exports.setupCircuitBreaker = setupCircuitBreaker;