import React, { PureComponent } from "react";
import AzureCloud from "./AzureCloud";

class AzureFile extends PureComponent {
  constructor(props) {
    super(props);
    this.container = props.container;
    this.filename = props.filename;

    this.state = {

    };
    this.azure = new AzureCloud();
  }

  changeColor(){
    this.setState({deletingMode: !this.state.deletingMode});
  }

  async triggerDownload(blob) {
    const data = await blob.blobBody;
    const a = document.createElement("a");
    a.style.display = "none";
    document.body.appendChild(a);
    a.href = window.URL.createObjectURL(data);
    a.setAttribute("download", this.filename);
    a.click();
    window.URL.revokeObjectURL(a.href);
    document.body.removeChild(a);
  }

  async click() {
    let blob = await this.azure.downloadBlob(this.container, this.filename);
    this.triggerDownload(blob);
  }
  render() {
    return (
      <div
    
        className="AzureBlob"
        onClick={() => this.click()}
      >
        <img className="AzureBlobImage"></img>
        <p className="AzureText">
          {this.filename != null ? this.filename : "loading..."}
        </p>
      </div>
    );
  }
}

export default AzureFile;
