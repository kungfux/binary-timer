class BitCounter {
  private static MAXIMUM_BITS = 12;
  private static MAXIMUM_SECONDS = Math.pow(2, BitCounter.MAXIMUM_BITS) - 1;

  private static bits = Array(this.MAXIMUM_BITS).fill(0);

  public getMaximumBits(): number {
    return BitCounter.MAXIMUM_BITS;
  }

  public getBits(): number[] {
    return [...BitCounter.bits];
  }

  public getTime(): number {
    return this.getBits().reduce((acc, bit, index) => {
      return acc + bit * Math.pow(2, index);
    }, 0);
  }

  public setTime(seconds: number): number[] {
    const secondsToAdd = Math.min(seconds, BitCounter.MAXIMUM_SECONDS);
    BitCounter.bits = secondsToAdd
      .toString(2)
      .padStart(BitCounter.MAXIMUM_BITS, "0")
      .split("")
      .map(Number)
      .reverse();
    return this.getBits();
  }

  public addTime(seconds: number): number[] {
    this.setTime(this.getTime() + seconds);
    return this.getBits();
  }

  public reduceTime(seconds: number): number[] {
    this.setTime(this.getTime() - seconds);
    return this.getBits();
  }

  public reverseBit(index: number): number[] {
    BitCounter.bits[index] = 1 - BitCounter.bits[index];
    return this.getBits();
  }

  public toString(): string {
    const seconds = this.getTime();
    return `${Math.floor(seconds / 60)} minute(s) and ${
      seconds % 60
    } second(s)`;
  }
}

export default BitCounter;
