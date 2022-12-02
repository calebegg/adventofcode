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
      while (val.startsWith("1")) {
        pull(1);
        pull(4);
      }
      pull(1);
      pull(4);
      return { versionTotal: version, length };
    }
    const lengthType = pull(1);
    if (lengthType === 0) {
      const packetLength = pull(15);
      let totalLength = 0;
      let versionTotal = version;
      while (totalLength < packetLength) {
        const { versionTotal: vt, length: l } = parse(val);
        totalLength += l;
        val = val.substring(l);
        versionTotal += vt;
      }
      return { versionTotal, length: totalLength + length };
    } else {
      const numPackets = pull(11);
      let versionTotal = version;
      let totalLength = 0;
      for (let i = 0; i < numPackets; i++) {
        const { versionTotal: vt, length: l } = parse(val);
        val = val.substring(l);
        totalLength += l;
        versionTotal += vt;
      }
      return { versionTotal, length: totalLength + length };
    }
  }
  console.log(
    parse(
      BigInt("0x" + data.toString())
        .toString(2)
        .padStart(data.length * 4, "0")
    ).versionTotal
  );
});
