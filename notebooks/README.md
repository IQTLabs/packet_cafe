# Notebooks for exploring PCAPs

Check out the [scapy intro notebook](scapy_intro.ipynb) as a starting place.

## Running Jupyter Notebook to interactively use notebooks

From the working directory of this repo:
```
docker build -t packet_cafe_notebooks .
docker run -it -p 8888:8888 -v $(pwd):/home/jovyan packet_cafe_notebooks
```

Browse to the URL noted in the output of the running container, i.e.:
```
[I 19:38:54.853 NotebookApp] The Jupyter Notebook is running at:
[I 19:38:54.855 NotebookApp] http://(af045dd3b82d or 127.0.0.1):8888/?token=4b4cd4ac9fbc96c1b3419e11a42b3f5d22e36f5df0ce40ca
[I 19:38:54.856 NotebookApp] Use Control-C to stop this server and shut down all kernels (twice to skip confirmation).
[C 19:38:54.877 NotebookApp] 

    To access the notebook, open this file in a browser:
        file:///home/jovyan/.local/share/jupyter/runtime/nbserver-7-open.html
    Or copy and paste one of these URLs:
        http://(af045dd3b82d or 127.0.0.1):8888/?token=4b4cd4ac9fbc96c1b3419e11a42b3f5d22e36f5df0ce40ca
```
