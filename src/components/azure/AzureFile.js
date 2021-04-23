import React, { PureComponent } from "react";
import AzureCloud from "./AzureCloud";
import "../../styles/azurefile.scss";
class AzureFile extends PureComponent {
  constructor(props) {
    super(props);
    this.container = props.container;
    this.filename = props.filename;
    this.azure = new AzureCloud();
  }

  changeColor() {
    this.setState({ deletingMode: !this.state.deletingMode });
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

  someHandler = () => {
    if(this.props.deletingMode){

    }
  }

  async click() {
    try {
      if (!this.props.deletingMode) {
        let blob = await this.azure.downloadBlob(this.container, this.filename);
        await this.triggerDownload(blob);
      } else if (this.props.deletingMode) {
        await this.azure.deleteFile(this.container, this.filename);
      }
    } catch (err) {
    }
    this.props.callback(this.props.filename);
  }
  render() {
    return (
      <button
        style={{
          backgroundColor: this.props.deletingMode ? "#808080" : "#176bef",
        }}
        onMouseEnter={() => this.someHandler}
        className= {["AzureBlob", this.props.deletingMode ? " AzureBlobShake" : ""].join(" ")}
        onClick={() => {
          this.click();
        }}
      >
        <img className="AzureBlobImage"></img>
        <p className="AzureText">
          {this.filename != null ? this.filename : "loading..."}
        </p>
      </button>
    );
  }
}

export default AzureFile;
