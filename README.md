# action-wf-test

1. `func init LocalFunctionProj --dotnet`
1. `cd LocalFunctionProj`
1. `func new --name HttpExample --template "HTTP trigger" --authlevel "anonymous"`
1. `func start`

2. `mkdir LocalFunctionProjTest`
3. `chmod ugo+rwx LocalFunctionProjTest`
4. Create ReadyAPI Test Suite and store in `LocalFunctionProjTest`

5. export `SLM_API_KEY`
6. `./startServerAndTest.sh`
