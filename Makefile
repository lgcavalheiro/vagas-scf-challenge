BASE=http://localhost:3000
GETALLURL=${BASE}/users
GETONEURL=${BASE}/users?name=João+Oliveira

load-all: load-get-users load-get-user load-process

load-get-users:
	echo "GET ${GETALLURL}" | vegeta attack -duration=5s -rate=100 | tee perf-all-users-results.bin | vegeta report

load-get-user:
	echo "GET ${GETONEURL}" | vegeta attack -duration=5s -rate=100 | tee perf-one-user-results.bin | vegeta report

load-process:
	cat perf-all-users-results.bin | vegeta plot > perf-all-users-plot.html
	cat perf-one-user-results.bin | vegeta plot > perf-one-user-plot.html
	mkdir -p ./docs
	mv perf-* ./docs