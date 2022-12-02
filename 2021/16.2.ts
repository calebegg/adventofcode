import { readFile } from "fs";

readFile("16.txt", (err, data) => {
  function parse(val: string) {
    let length = 0;
    function pull(digits: number) {
      const ret = Number("0b" + val.substring(0, digits));
      if (isNaN(ret)) throw new Error("NaN");
      val = val.substring(digits);
      length += digits;
      return ret;
    }
    const version = pull(3);
    const type = pull(3);
    if (type === 4) {
      let value = 0;
      while (val.startsWith("1")) {
        pull(1);
        value *= 16;
        value += pull(4);
      }
      pull(1);
      value *= 16;
      value += pull(4);
      return { versionTotal: version, length, value };
    }
    const lengthType = pull(1);
    let versionTotal = version;
    let totalLength = 0;
    const values = [];
    if (lengthType === 0) {
      const packetLength = pull(15);
      while (totalLength < packetLength) {
        const { versionTotal: vt, length: l, value } = parse(val);
        values.push(value);
        totalLength += l;
        val = val.substring(l);
        versionTotal += vt;
      }
    } else {
      const numPackets = pull(11);
      for (let i = 0; i < numPackets; i++) {
        const { versionTotal: vt, length: l, value } = parse(val);
        values.push(value);
        val = val.substring(l);
        totalLength += l;
        versionTotal += vt;
      }
    }
    let value = 0;
    switch (type) {
      case 0:
        value = values.reduce((x, y) => x + y);
        break;
      case 1:
        value = values.reduce((x, y) => x * y);
        break;
      case 2:
        value = Math.min(...values);
        break;
      case 3:
        value = Math.max(...values);
        break;
      case 5:
        value = values[0] > values[1] ? 1 : 0;
        break;
      case 6:
        value = values[0] < values[1] ? 1 : 0;
        break;
      case 7:
        value = values[0] === values[1] ? 1 : 0;
    }
    return { versionTotal, length: totalLength + length, value };
  }
  console.log(
    parse(
      BigInt("0x" + data.toString())
        .toString(2)
        .padStart(data.length * 4, "0")
    ).value
  );
});
