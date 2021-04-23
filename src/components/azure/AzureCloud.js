import { BlobServiceClient } from "@azure/storage-blob";
import { BlobService } from "azure-storage";

export default class AzureCloud {
  constructor() {
    this.account = process.env.REACT_APP_AZURE_ACCOUNT;
    this.sas =process.env.REACT_APP_AZURE_SAS;
    this.key1 = process.env.REACT_APP_AZURE_KEY_ONE;

    this.blobServiceClient = new BlobServiceClient(
      `https://${this.account}.blob.core.windows.net${this.sas}`
    );

    this.blobSasUrl =process.env.REACT_APP_AZURE_BLOBSAS_URL;
    this.blobUri = "https://" + "cyberfilesshare" + ".blob.core.windows.net";
    this.sasToken =process.env.REACT_APP_AZURE_SAS_TOKEN;
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
    });
  }
  createContainer = async (containerName) => {
    const containerClient = this.blobServiceClient.getContainerClient(
      containerName
    );
    try {
      await containerClient.create({ access: "container" });
    } catch (error) {
      console.log(error.message);
    }
  };
  deleteContainer = async (containerName) => {
    const containerClient = this.blobServiceClient.getContainerClient(
      containerName
    );

    try {
      await containerClient.delete();
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
      let iter = containerClient.listBlobsFlat();
      let blobItem = await iter.next();
      while (!blobItem.done) {
        blobs.push(blobItem.value.name);
        blobItem = await iter.next();
      }
    } catch (error) {
      console.log(error.message);
    }
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
      const promises = [];
      for (const file of fileInput) {
        const blockBlobClient = containerClient.getBlockBlobClient(file.name);
        promises.push(blockBlobClient.uploadBrowserData(file));
      }
      await Promise.all(promises);
    } catch (error) {
      console.log(error.message);
    }
  };

  deleteFile = async (containerName, blobName) => {
    const containerClient = this.blobServiceClient.getContainerClient(
      containerName
    );
    try {
      await containerClient.deleteBlob(blobName);
    } catch (error) {
      console.log(error.message);
    }
  };
}
