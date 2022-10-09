import { Service, Plugin, bootstrap } from "@hammerhq/core";

@Service()
class MyService {}

@Service()
class MyOtherService {
	constructor(private readonly service: MyService) {}
}

@Plugin({
	services: [MyService],
})
class MyPlugin {}

bootstrap({
	plugins: [MyPlugin],
});
