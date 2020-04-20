import React, { useEffect, useCallback } from "react";
import { useDispatch, connect } from 'react-redux'

import { fetchToolStatus } from 'epics/fetch-status-epic'
// import { startFetchToolStatus } from 'epics/auto-fetch-status-epic'
import { fetchToolResults } from 'epics/fetch-tool-results-epic'

const DataMonitor = (props) => {
    const dispatch = useDispatch();

    const getCompleted = (statuses) => {
        console.log("getCompleted statuses: %o", statuses);
        var completed = [];
        for (const tool in statuses ){
            console.log("getCompleted tool: %s", tool);
            console.log("getCompleted statuses[tool]: %s", statuses[tool].status);
            if(statuses[tool].status === "Complete"){
                completed.push(tool);
            }
        }

        return completed;
    }

    useEffect(() => {
        for(const file of props.files){
            const payload = {
                'sessionId': props.sessionId, 
                'fileId':file.id,
            }

            //props.startFetchToolStatus(payload);
            const action$ = { 'type': fetchToolStatus.toString(), 'payload': payload };
            console.log("dispatching acvtion for file %s", file.id);
            dispatch(action$);
        }
    }, [props.files]);

    useEffect(() => {
        console.log("use Effect props: %o", props);
        console.log("status effect called");
        console.log("files: %o", props.files);
        console.log("statuses: %o", props.statuses);

        if(props.files && props.statuses)
        for(const file of props.files){
            console.log("file for getComplete: %o", file);
            console.log("statuses for getComplete: %o", props.statuses[file.id]);
            const completed = getCompleted(props.statuses[file.id]);
            console.log("completed: %o", completed);
            for(const tool of completed){
                const payload = {
                    'sessionId': props.sessionId, 
                    'fileId':file.id,
                    'tool': tool,
                    'counter':0,
                }
                const action$ = fetchToolResults(payload);
                dispatch(action$);
            }
        }
    }, [props.files, props.statuses]);

    return null;
}

// const mapStateToProps = null;

// const mapDispatchToProps = {
//     startFetchToolStatus,
// };

export default DataMonitor
// export default connect(mapStateToProps, mapDispatchToProps) (DataMonitor)