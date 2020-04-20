import React, { useEffect, useCallback } from "react";
import { useDispatch } from 'react-redux'

import { fetchToolStatus } from 'epics/fetch-status-epic'
import { fetchToolResults } from 'epics/fetch-tool-results-epic'

const DataMonitor = (props) => {
    const dispatch = useDispatch();

    const getCompleted = (statuses) => {
        var completed = [];
        for (const tool in statuses ){
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
            dispatch(action$);
        }
    }, [props.files]);

    useEffect(() => {
        if(props.files && props.statuses)
        for(const file of props.files){
            const completed = getCompleted(props.statuses[file.id]);
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

export default DataMonitor