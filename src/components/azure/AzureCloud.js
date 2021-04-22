import { BlobServiceClient } from "@azure/storage-blob";
import { BlobService } from "azure-storage";

export default class AzureCloud {
  constructor() {
    this.account = "cyberfilesshare";
    this.sas =
      "?sv=2020-02-10&ss=bfqt&srt=sco&sp=rwdlacupx&se=2022-04-19T14:46:35Z&st=2021-04-19T06:46:35Z&spr=https&sig=wXP4u1ACRrSCA7WWfme%2F16dfIk7Z8I%2FEYVqWeL9H07Q%3D";
    this.key1 =
      "THkhmR+Qyj620VKWzYNeEugycZXvs+gTw2q+HmhZVm1KtkePP8B+OeiVdvjYGi6d49qK3TYTAWoqBVnuxHcneA==";

    this.blobServiceClient = new BlobServiceClient(
      `https://${this.account}.blob.core.windows.net${this.sas}`
    );

    this.blobSasUrl =
      "https://cyberfilesshare.blob.core.windows.net/?sv=2020-02-10&ss=bfqt&srt=sco&sp=rwdlacupx&se=2022-04-19T14:46:35Z&st=2021-04-19T06:46:35Z&spr=https&sig=wXP4u1ACRrSCA7WWfme%2F16dfIk7Z8I%2FEYVqWeL9H07Q%3D";
    this.blobUri = "https://" + "cyberfilesshare" + ".blob.core.windows.net";
    this.sasToken =
      "?sv=2020-02-10&ss=bfqt&srt=sco&sp=rwdlacupx&se=2022-04-19T14:46:35Z&st=2021-04-19T06:46:35Z&spr=https&sig=wXP4u1ACRrSCA7WWfme%2F16dfIk7Z8I%2FEYVqWeL9H07Q%3D";
  }
  downloadBlob = async (containerName, blobName) => {
    const containerClient = this.blobServiceClient.getContainerClient(
      containerName
    );
    const blobClient = containerClient.getBlobClient(blobName);
    const downloadBlockBlobResponse = await blobClient.download();
    return downloadBlockBlobResponse;
  };
  // [Browsers only] A helper method used to convert a browser Blob into string.
  async blobToString(blob) {
    const fileReader = new FileReader();
    return new Promise((resolve, reject) => {
      fileReader.onloadend = (ev) => {
        resolve(ev.target.result);
      };
      fileReader.onerror = reject;
      fileReader.readAsText(blob);
      console.log(fileReader.result);
    });
  }
  createContainer = async (containerName) => {
    const containerClient = this.blobServiceClient.getContainerClient(
      containerName
    );
    try {
      console.log(`Creating container "${containerName}"...`);
      await containerClient.create({ access: "container" });
      console.log(`Done.`);
    } catch (error) {
      console.log(error.message);
    }
  };
  deleteContainer = async (containerName) => {
    const containerClient = this.blobServiceClient.getContainerClient(
      containerName
    );

    try {
      console.log(`Deleting container "${containerName}"...`);
      await containerClient.delete();
      console.log(`Done.`);
    } catch (error) {
      console.log(error.message);
    }
  };
  listFiles = async (containerName) => {
    const containerClient = this.blobServiceClient.getContainerClient(
      containerName
    );

    var blobs = [];
    try {
      console.log("Retrieving file list...");
      let iter = containerClient.listBlobsFlat();
      let blobItem = await iter.next();
      while (!blobItem.done) {
        blobs.push(blobItem.value.name);
        blobItem = await iter.next();
      }
      if (blobs.length > 0) {
        console.log("Done.");
      } else {
        console.log("The container does not contain any files.");
      }
    } catch (error) {
      console.log(error.message);
    }
    console.log(blobs);
    return blobs;
  };
  listContainers = async () => {
    let i = 1;
    for await (const container of this.blobServiceClient.listContainers()) {
      console.log(`Container ${i++}: ${container.name}`);
    }
  };

  uploadFiles = async (containerName, fileInput) => {
    const containerClient = this.blobServiceClient.getContainerClient(
      containerName
    );

    try {
      console.log("Uploading files...");
      const promises = [];
      for (const file of fileInput) {
        const blockBlobClient = containerClient.getBlockBlobClient(file.name);
        promises.push(blockBlobClient.uploadBrowserData(file));
      }
      await Promise.all(promises);
      console.log("Done.");
    } catch (error) {
      console.log(error.message);
    }
  };

  deleteFile = async (containerName, blobName) => {
    const containerClient = this.blobServiceClient.getContainerClient(
      containerName
    );
    try {
      console.log("Deleting files...");
      await containerClient.deleteBlob(blobName);
      console.log("Done.");
    } catch (error) {
      console.log(error.message);
    }
  };
}
