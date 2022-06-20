import express from "express";
import type { ParamsDictionary } from "express-serve-static-core";
import multer from "multer";
import type { ParsedQs } from "qs";
import { PassThrough } from "node:stream";

const app = express();

class PassStorage implements multer.StorageEngine {
  _handleFile(
    req: express.Request<
      ParamsDictionary,
      any,
      any,
      ParsedQs,
      Record<string, any>
    >,
    file: Express.Multer.File,
    callback: (
      error?: any,
      info?: Partial<Express.Multer.File & { pass: PassThrough }> | undefined
    ) => void
  ): void {
    console.log("handling file", req, file);

    const pass = new PassThrough();

    file.stream.pipe(pass);

    callback(null, { pass });
  }
  _removeFile(): void {
    console.log("removing file");
  }
}

const upload = multer({ storage: new PassStorage() });

app.post("/profile", upload.single("avatar"), function (req, res) {
  const pass: PassThrough = (req.file as any).pass;

  console.log({ pass });
  console.log("read", pass.read());
  res.send("ok");
});

async function main(): Promise<void> {
  app.listen(3000);
}

main();

process.on("unhandledRejection", (reason) => {
  console.error(reason);
  process.exit(1);
});
