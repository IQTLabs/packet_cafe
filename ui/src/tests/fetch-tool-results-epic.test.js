import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import { createEpicMiddleware } from 'redux-observable';
import { of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { setToolResults } from "domain/data";
import rootEpic from 'epics/root-epic'
import { fetchToolResults } from "epics/fetch-tool-results-epic"

import fetchToolResultsEpic from "epics/fetch-tool-results-epic"

//use dependency injection to test this epic without having to hit a real URL
//so that we can get consisten test results regardless of connectivity
describe("fetchToolResultsEpic", () => {
    const sessionId = uuidv4();
    const tool = "test";
	const counter = "test";
	const fileId = uuidv4();
    const results = [
    {
        "Alerts": [
            ""
        ]
    },
    {
        "Breakdown by protocol (includes rebuilt packets):": [
            "        Eth:        14293 (100.000%)",
            "       VLAN:            0 (  0.000%)",
            "        IP4:        14275 ( 99.874%)",
            "       Frag:            0 (  0.000%)",
            "       ICMP:           34 (  0.238%)",
            "        UDP:          501 (  3.505%)",
            "        TCP:        13740 ( 96.131%)",
            "        IP6:            0 (  0.000%)",
            "    IP6 Ext:            0 (  0.000%)",
            "   IP6 Opts:            0 (  0.000%)",
            "      Frag6:            0 (  0.000%)",
            "      ICMP6:            0 (  0.000%)",
            "       UDP6:            0 (  0.000%)",
            "       TCP6:            0 (  0.000%)",
            "     Teredo:            0 (  0.000%)",
            "    ICMP-IP:            0 (  0.000%)",
            "    IP4/IP4:            0 (  0.000%)",
            "    IP4/IP6:            0 (  0.000%)",
            "    IP6/IP4:            0 (  0.000%)",
            "    IP6/IP6:            0 (  0.000%)",
            "        GRE:            0 (  0.000%)",
            "    GRE Eth:            0 (  0.000%)",
            "   GRE VLAN:            0 (  0.000%)",
            "    GRE IP4:            0 (  0.000%)",
            "    GRE IP6:            0 (  0.000%)",
            "GRE IP6 Ext:            0 (  0.000%)",
            "   GRE PPTP:            0 (  0.000%)",
            "    GRE ARP:            0 (  0.000%)",
            "    GRE IPX:            0 (  0.000%)",
            "   GRE Loop:            0 (  0.000%)",
            "       MPLS:            0 (  0.000%)",
            "        ARP:           18 (  0.126%)",
            "        IPX:            0 (  0.000%)",
            "   Eth Loop:            0 (  0.000%)",
            "   Eth Disc:            0 (  0.000%)",
            "   IP4 Disc:            0 (  0.000%)",
            "   IP6 Disc:            0 (  0.000%)",
            "   TCP Disc:            0 (  0.000%)",
            "   UDP Disc:            0 (  0.000%)",
            "  ICMP Disc:            0 (  0.000%)",
            "All Discard:            0 (  0.000%)",
            "      Other:            0 (  0.000%)",
            "Bad Chk Sum:            0 (  0.000%)",
            "    Bad TTL:            0 (  0.000%)",
            "     S5 G 1:           20 (  0.140%)",
            "     S5 G 2:           12 (  0.084%)",
            "      Total:        14293"
        ],
        "Action Stats:": [
            "     Alerts:            0 (  0.000%)",
            "     Logged:            0 (  0.000%)",
            "     Passed:            0 (  0.000%)",
            "Limits:",
            "      Match:            0",
            "      Queue:            0",
            "        Log:            0",
            "      Event:            0",
            "      Alert:            0",
            "Verdicts:",
            "      Allow:        11629 ( 81.544%)",
            "      Block:            0 (  0.000%)",
            "    Replace:            0 (  0.000%)",
            "  Whitelist:         2632 ( 18.456%)",
            "  Blacklist:            0 (  0.000%)",
            "     Ignore:            0 (  0.000%)",
            "     (null):            0 (  0.000%)"
        ],
        "Frag3 statistics:": [
            "        Total Fragments: 0",
            "      Frags Reassembled: 0",
            "               Discards: 0",
            "          Memory Faults: 0",
            "               Timeouts: 0",
            "               Overlaps: 0",
            "              Anomalies: 0",
            "                 Alerts: 0",
            "                  Drops: 0",
            "     FragTrackers Added: 0",
            "    FragTrackers Dumped: 0",
            "FragTrackers Auto Freed: 0",
            "    Frag Nodes Inserted: 0",
            "     Frag Nodes Deleted: 0"
        ],
        "Stream statistics:": [
            "            Total sessions: 544",
            "              TCP sessions: 397",
            "              UDP sessions: 147",
            "             ICMP sessions: 0",
            "               IP sessions: 0",
            "                TCP Prunes: 0",
            "                UDP Prunes: 0",
            "               ICMP Prunes: 0",
            "                 IP Prunes: 0",
            "TCP StreamTrackers Created: 397",
            "TCP StreamTrackers Deleted: 397",
            "              TCP Timeouts: 0",
            "              TCP Overlaps: 0",
            "       TCP Segments Queued: 5501",
            "     TCP Segments Released: 5501",
            "       TCP Rebuilt Packets: 1608",
            "         TCP Segments Used: 5430",
            "              TCP Discards: 135",
            "                  TCP Gaps: 28",
            "      UDP Sessions Created: 147",
            "      UDP Sessions Deleted: 147",
            "              UDP Timeouts: 0",
            "              UDP Discards: 0",
            "                    Events: 225",
            "           Internal Events: 0",
            "           TCP Port Filter",
            "                  Filtered: 0",
            "                 Inspected: 0",
            "                   Tracked: 13708",
            "           UDP Port Filter",
            "                  Filtered: 0",
            "                 Inspected: 0",
            "                   Tracked: 147"
        ],
        "HTTP Inspect - encodings (Note: stream-reassembled packets included):": [
            "    POST methods:                         10        ",
            "    GET methods:                          516       ",
            "    HTTP Request Headers extracted:       532       ",
            "    HTTP Request Cookies extracted:       445       ",
            "    Post parameters extracted:            10        ",
            "    HTTP response Headers extracted:      558       ",
            "    HTTP Response Cookies extracted:      51        ",
            "    Unicode:                              1         ",
            "    Double unicode:                       0         ",
            "    Non-ASCII representable:              0         ",
            "    Directory traversals:                 0         ",
            "    Extra slashes (\"//\"):                 115       ",
            "    Self-referencing paths (\"./\"):        0         ",
            "    HTTP Response Gzip packets extracted: 153       ",
            "    Gzip Compressed Data Processed:       749406.00 ",
            "    Gzip Decompressed Data Processed:     2041033.00",
            "    Http/2 Rebuilt Packets:               0         ",
            "    Total packets processed:              6320      "
        ],
        "SMTP Preprocessor Statistics": [
            "  Total sessions                                    : 0",
            "  Max concurrent sessions                           : 0"
        ],
        "dcerpc2 Preprocessor Statistics": [
            "  Total sessions: 1",
            "",
            "  Transports",
            "    SMB",
            "      Total sessions: 1",
            "      Packet stats",
            "        Packets: 7",
            "        Ignored bytes: 322",
            "        Maximum outstanding requests: 0",
            "        SMB command requests/responses processed",
            "    SMB2",
            "      Smb2 prunes: 0",
            "      Memory used for smb2 processing: 0",
            "      Maximum memory used for smb2 processing: 0",
            "      SMB2 command requests/responses processed",
            "        smb2 create         : 0",
            "        smb2 write          : 0",
            "        smb2 read           : 0",
            "        smb2 set info       : 0",
            "        smb2 tree connect   : 0",
            "        smb2 tree disconnect: 0",
            "        smb2 close          : 0"
        ],
        "SSL Preprocessor:": [
            "   SSL packets decoded: 777       ",
            "          Client Hello: 116       ",
            "          Server Hello: 116       ",
            "           Certificate: 48        ",
            "           Server Done: 199       ",
            "   Client Key Exchange: 35        ",
            "   Server Key Exchange: 0         ",
            "         Change Cipher: 158       ",
            "              Finished: 0         ",
            "    Client Application: 79        ",
            "    Server Application: 61        ",
            "                 Alert: 1         ",
            "  Unrecognized records: 375       ",
            "  Completed handshakes: 0         ",
            "        Bad handshakes: 0         ",
            "      Sessions ignored: 50        ",
            "    Detection disabled: 14        "
        ],
        "SIP Preprocessor Statistics": [
            "  Total sessions: 0"
        ],
        "IMAP Preprocessor Statistics": [
            "  Total sessions                                    : 0",
            "  Max concurrent sessions                           : 0"
        ],
        "POP Preprocessor Statistics": [
            "  Total sessions                                    : 0",
            "  Max concurrent sessions                           : 0"
        ]
    }
]
    const data = {'file': fileId, 'tool':tool, 'results': results };
    const mockResponse = data;
    const mockAjax = () => {
        return  of({ 'response': mockResponse });
      }

    const dependencies = {
      'ajax': mockAjax
    };

    let store;

    beforeEach(() => {
        const epicMiddleware = createEpicMiddleware();
        const mockStore = configureMockStore([epicMiddleware]);
        store  = mockStore();
        epicMiddleware.run(rootEpic, {'dependencies': dependencies});
    });

    afterEach(() => {
        
    });

    it("fetches an array of tool results", (done) => {
        let typeToCheck = setToolResults.toString();

        const action$ = of({'type': fetchToolResults.toString(), 'payload': { 'sessionId': sessionId, 'tool': tool, 'counter': counter, 'fileId': fileId } });
        fetchToolResultsEpic(action$, store, mockAjax)
             .subscribe((actions) => {
                expect(actions.type).to.equal(typeToCheck);
                expect(actions.payload).to.equal(data);

                done();
            });
    });
});