import React, {Component} from "react";
import ListEntry from "./listEntry";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome} from '@fortawesome/free-solid-svg-icons'

class FileList extends Component{
    constructor(props) {
        super(props)
        this.state = {
            root : props.root,
            files: props.files
        }
    }
    componentDidUpdate(prevProps){
        if(JSON.stringify(prevProps) !== JSON.stringify(this.props)){
            this.setState({root : this.props.root, files : this.props.files})
        }
    }
    onClickDir(path){
        this.props.onClickDir(path);
        this.setState({root : path});
    }
    
    showFileList(){
        if (this.state.files){            
            if(this.state.root === ""){
                return this.state.files.filter((a) => a.type === "tree").map((f) => {
                    return <ListEntry key={f.sha} onClick={() => this.onClickDir(f.path)} caption={f.path} className="d-flex text-secondary" />
                })
            }else{
                return [<ListEntry key="root" onClick={() => this.onClickDir("")} caption={<FontAwesomeIcon icon={faHome}/>} className="d-flex text-secondary h5" />]
                .concat( this.state.files
                    .filter((a) =>     
                        a.path.startsWith(this.state.root) 
                        && a.path.replace(this.state.root,"").split("/").length === 2
                        && a.type !== "tree"
                    )
                    .map((f) => {
                        let f_arr = f.path.replace(this.state.root + "/","").split(".")
                        let f_n = f_arr.slice(0,f_arr.length - 1).join(".")

                        return <ListEntry key={f.sha} onClick={(e) => this.props.onClickFile(f)} caption={f_n} className="d-flex text-secondary" />
                    }))
            }                        
        }
        return "";
    }


    render(){
        const def_title = "файлы на сервере";

        return (<div className={this.props.className} >
                    <h4>{this.props.title || def_title}</h4>
                    <div className="mh-85 mh-md-85 y-scroll-auto">
                        {this.showFileList()}
                    </div>                    
                </div>);        
    }
}

export default FileList;