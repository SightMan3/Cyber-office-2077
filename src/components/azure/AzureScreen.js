import React, { PureComponent } from "react";
import { BlobServiceClient } from "@azure/storage-blob";
import { BlobService } from "azure-storage";
import AzureCloud from "./AzureCloud";
import Header from "../Header";
import AzureFile from "./AzureFile";
import "../../styles/azure.scss";
class AzureScreen extends PureComponent {
  deletingMode = false;
  constructor(props) {
    super(props);
    this.state = {
      container: "lukas-randuska",
      fileNames: [],
      files: [],
      deletingMode: false,
    };
    this.onChange = this.onChange.bind(this);
    this.azure = new AzureCloud();
  }

  async onChange(e) {
    var files = e.target.files;
    console.log("look below me!");
    console.log(files);
    var filesArr = Array.prototype.slice.call(files);
    console.log(filesArr);
    //this.setState({ files: [...this.state.files, ...filesArr] });
    this.setState({ files: filesArr });
    this.azure.uploadFiles(this.state.container, filesArr);
    await this.fetchFiles();
    this.setState({});
  }
  removeFile(f) {
    this.setState({ files: this.state.files.filter((x) => x !== f) });
  }

  componentDidMount() {
    this.fetchFiles();
  }
  async fetchFiles() {
    console.log("starting adding files");
    let fileElements = [];
    let fileNames = await this.azure.listFiles("lukas-randuska");

    this.setState({ fileNames: fileNames });
    return fileElements;
  }

  toggleDelete() {
    let local = !this.state.deletingMode;
    this.setState({ deletingMode: local });
    console.log("toggling delete");
    console.log(local);
  }

  childFunc = () => {
    console.log("fetching files bcs of child");
    this.fetchFiles();
  };

  render() {
    return (
      <div className="AzureContainer">
        <Header routeBack={this.props.history.push} />

        <div className="AzureButtonContainer">
          <div className="AzureButton">
            <label>
              <input type="file" multiple onChange={this.onChange} />
              <p className="AzureText" > Add files</p>
            </label>
          </div>

          <div className="AzureButton" onClick={() => this.toggleDelete()}>
            <p className="AzureText">Delete File</p>
          </div>
        </div>

        <div className="AzureGridOfFiles">
          {this.state.fileNames.map((el) => (
            <AzureFile
              callback={this.childFunc}
              deletingMode={this.state.deletingMode}
              container={this.state.container}
              filename={el}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default AzureScreen;
