# v0.1.2 (2021-06-15)

- Updated tools
  * networkml: v0.6.13
  * pcapplot: v0.1.11
  * iqtlabs/pcap_to_node_pcap: v0.11.22
  * iqtlabs/ncapture: v0.11.22
  * iqtlabs/tcprewrite_dot1q: v0.11.22
  * iqtlabs/snort: v0.11.22
  * iqtlabs/pcap_stats: v0.11.22
  * iqtlabs/mercury: v0.11.22
  * iqtlabs/p0f: v0.11.22

- Features
  * Integrated results of Pcap-viz project
  * Added Dossier and Device views
  * Added Device and Traffic summaries
  * Redesigned Home view
  * added file selector

- Fixes
  * Corrected Formats for networkML and p0f
  * moved from master to main
  * corrected issue with componenents getting data from state instead of props
  * Updated copyright info
  * corrected issue with dossier view when pcapstats is not yet complete
  * corrected issue with home view ignoring fileId
  * updated linting settings
  * removed unused heatmap view
  * refactored for breaking changes in D3 v6

- Updated dependencies
  * serve, d3, babel, codecov-action, apexcharts, mocha, python-magic, typescript, concurrently, flask, jinja, concurrently, react-redux, styled components, Font Awesome, chai, react-tabs, arrow, docker, react-data-table-components, react scripts, pika, nodemon, react-tabs, uuid, eslint

# v0.1.1 (2020-08-26)

- Updated tools
- Updated GitHub Action workflows to improve working with forks
- Maintain state for last session and request IDs
- Cleaned up exited containers on boot that were unnecessary
- Updated react-scripts, semantic-ui-react, docker, babel/core, typescript, arrow, react-data-table-component, mocha, and networkml

# v0.1.0 (2020-08-11)

- Initial release
- Basic UI functionality
- Heatmap visualization
- Integrated workflow of tools that process PCAPs
- API that is scriptable
