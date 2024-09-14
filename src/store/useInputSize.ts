import { InputSize } from "../components/Page/Withdraw/WithdrawAmountBYTE";
import { getTextWidth } from "./useTextWidth";

export const defaultSize: InputSize = { size: 50, width: 32 };

export const getInputSize = (value: string, parent: HTMLLabelElement) => {
    const max = parent.clientWidth;
    let size = defaultSize.size;
    let width = getTextWidth(value, `500 ${size}px 'Metropolis'`);
    while (Math.round(width) > max - 135) {
        size = Math.max(1, size - 1);
        width = getTextWidth(value, `500 ${size}px 'Metropolis'`);
    }

    return {
        width: Math.max(Math.round(width) + 0, value.length * 9, 30),
        size: size
    };
};