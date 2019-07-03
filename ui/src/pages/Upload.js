import React from 'react'; 
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import Dropzone  from '../components/dropzone/Dropzone';
import Progress from '../components/progress/Progress';


class Upload extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            files: [],
            uploading: false,
            uploadProgress: {},
            successfullUploaded: false
        };
    
        this.onFilesAdded = this.onFilesAdded.bind(this);
        this.uploadFiles = this.uploadFiles.bind(this);
        this.sendRequest = this.sendRequest.bind(this);
        this.renderActions = this.renderActions.bind(this);
    }

    onFilesAdded(files) {
        this.setState(prevState => ({
            files: prevState.files.concat(files)
        }));
    }
    
    async uploadFiles() {
        this.setState({ uploadProgress: {}, uploading: true });
        const promises = [];
        this.state.files.forEach(file => {
            promises.push(this.sendRequest(file));
        });
        try {
            await Promise.all(promises);

            this.setState({ successfullUploaded: true, uploading: false });
        } catch (e) {
            // Not Production ready! Do some error handling here instead...
            this.setState({ successfullUploaded: true, uploading: false });
        }
    }
    
    sendRequest(file) {
        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest();

            req.upload.addEventListener("progress", event => {
            if (event.lengthComputable) {
                const copy = { ...this.state.uploadProgress };
                copy[file.name] = {
                state: "pending",
                percentage: (event.loaded / event.total) * 100
                };
                this.setState({ uploadProgress: copy });
            }
            });

            req.upload.addEventListener("load", event => {
            const copy = { ...this.state.uploadProgress };
            copy[file.name] = { state: "done", percentage: 100 };
            this.setState({ uploadProgress: copy });
            resolve(req.response);
            });

            req.upload.addEventListener("error", event => {
            const copy = { ...this.state.uploadProgress };
            copy[file.name] = { state: "error", percentage: 0 };
            this.setState({ uploadProgress: copy });
            reject(req.response);
            });

            const formData = new FormData();
            formData.append("file", file, file.name);

            req.open("POST", "/express-upload");
            req.send(formData);
        });
    }
    
    renderProgress(file) {
        const uploadProgress = this.state.uploadProgress[file.name];
        if (this.state.uploading || this.state.successfullUploaded) {
            return (
            <div className="ProgressWrapper">
                <Progress progress={uploadProgress ? uploadProgress.percentage : 0} />
                <img
                className="CheckIcon"
                alt="done"
                src="baseline-check_circle_outline-24px.svg"
                style={{
                    opacity:
                    uploadProgress && uploadProgress.state === "done" ? 0.5 : 0
                }}
                />
            </div>
            );
        }
    }
    
    renderActions() {
        if (this.state.successfullUploaded) {
            return (
            <Button
                onClick={() =>
                this.setState({ files: [], successfullUploaded: false })
                }
            >
                Clear
            </Button>
            );
        } else {
            return (
            <Button
                disabled={this.state.files.length < 0 || this.state.uploading}
                onClick={this.uploadFiles}
            >
                Upload
            </Button>
            );
        }
    }

    render(){
        return(
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                    Upload tcpdump/*.pcap files
                </Header>
                <Form size='large'>
                    <Segment stacked>
                    <div>
                        <Dropzone
                        onFilesAdded={this.onFilesAdded}
                        disabled={this.state.uploading || this.state.successfullUploaded}
                        />
                    </div>
                    <div className="Files">
                        {this.state.files.map(file => {
                        return (
                            <div key={file.name} className="Row">
                            <span className="Filename">{file.name}</span>
                            {this.renderProgress(file)}
                            </div>
                        );
                        })}
                    </div>
                    <div className="Actions">{this.renderActions()}</div>
                    </Segment>
                </Form>
                {/*<Message>
                    New to us? <a href='#'>Sign Up</a>
                </Message>*/}
                </Grid.Column>
            </Grid>
        )
    }
}

export default Upload
