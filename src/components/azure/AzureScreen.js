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
    this.fetchFiles();
    this.setState({});
  }
  removeFile(f) {
    this.setState({ fileName: this.state.fileNames.filter((x) => x !== f) });
    this.setState({});
  }

  componentDidMount() {
    this.fetchFiles();
  }
  async fetchFiles() {
    console.log("starting to fetch files");
    let fileNames = await this.azure.listFiles(this.state.container);

    this.setState({ fileNames: fileNames });
    console.log("returning fetched files " + fileNames);
    return fileNames;
  }

  toggleDelete() {
    let local = !this.state.deletingMode;
    this.setState({ deletingMode: local });
    console.log("toggling delete");
    console.log(local);
  }

  childFunc = (fileName) => {
    if (this.state.deletinMode == true) {
      this.removeFile(fileName);
    }
    console.log("fetching files bcs of child");
    this.fetchFiles();
  };

  render() {
    return (
      <div className="AzureContainer">
        <Header
          routeBack={this.props.history.push}
          useremail={this.props.location.state.useremail}
        />

        <div className="AzureButtonContainer">
          <button className="AzureButton">
            <label>
              <input type="file" multiple onChange={(e) => this.onChange(e)} />
              <p className="AzureText"> Add files</p>
            </label>
          </button>

          <button className="AzureButton" onClick={() => this.toggleDelete()}>
            <p className="AzureText">
              Delete File ({this.state.deletingMode ? "on" : "off"})
            </p>
          </button>
        </div>

        {/* {this.state.fileNames > 0 ? ( */}
        <div className="AzureGridOfFiles">
          {this.state.fileNames.map((el) => (
            <AzureFile
              key={Math.random()}
              callback={this.childFunc}
              deletingMode={this.state.deletingMode}
              container={this.state.container}
              filename={el}
            />
          ))}
        </div>
        {/*  ) : (
           <div className="noFilesAzure">
             <div className="image_div">
               <div className="image"></div>
             </div>
             <div className="text_div">
               <p className="sadText">Add files using button above </p>
             </div>
           </div>
         )} */}
      </div>
    );
  }
}

export default AzureScreen;
