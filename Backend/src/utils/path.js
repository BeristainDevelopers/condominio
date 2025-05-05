import * as path from "path";

export const getCurrentDirectory = (fileURLToPath) => {
    const __filename = fileURLToPath
    return path.dirname(__filename);
};
