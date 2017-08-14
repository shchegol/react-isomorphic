export const TIME_REQUEST_STARTED = 'TIME_REQUEST_STARTED';
export const TIME_REQUEST_FINISHED = 'TIME_REQUEST_FINISHED';
export const TIME_REQUEST_ERROR = 'TIME_REQUEST_ERROR';

function timeRequestStarted() {
    return { type: TIME_REQUEST_STARTED };
}

function timeRequestFinished(time) {
    return { type: TIME_REQUEST_FINISHED, time };
}

function timeRequestError(errors) {
    return { type: TIME_REQUEST_ERROR, errors };
}

export function timeRequest() {
    return (dispatch) => {
        dispatch(timeRequestStarted());

        return setTimeout(() => dispatch(timeRequestFinished(Date.now())), 1000); // Изображаем network latency :)
    };
}