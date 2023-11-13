export class Progression {
    private readonly total: number;
    private value: number;

    public static fromText(text: string): Progression | null {
        try {
            const match = text.match(/^(\d+)\/(\d+)$/i);

            if (match == null) {
                return null;
            }

            return new Progression({
                total: parseFloat(match[2]),
                initValue: parseFloat(match[1]),
            });
        } catch (e) {
            if (e instanceof Error) {
                console.log(e.message);
            }
        }

        return null;
    }

    constructor({ total, initValue }: { total: number; initValue: number }) {
        this.total = total;
        this.value = initValue;
    }

    public toText(): string {
        return `${this.value}/${this.total}`;
    }

    public toMarkdown(): string {
        return `${this.value}/${this.total} ${progressImgElement(percentage(this.value, this.total))}`;
    }
}

function progressImgElement(percentage: number): string {
    return `<img src="https://progress-bar.dev/${percentage}/?width=50" style="height:1em; vertical-align: middle"/>`;
}

function percentage(x: number, total: number): number {
    return Math.round((x / total) * 100);
}
