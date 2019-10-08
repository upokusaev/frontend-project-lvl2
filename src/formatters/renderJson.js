const render = (diff) => JSON.stringify(diff);

const normalizeResult = (diff) => `${render(diff)}\n`;

export default normalizeResult;
