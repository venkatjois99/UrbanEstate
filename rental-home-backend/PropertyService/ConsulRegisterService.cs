
using Consul;
using Microsoft.Extensions.Configuration;

namespace PropertyService
{
    public class ConsulRegisterService : IHostedService

    {
        private readonly IConsulClient _consulClient;
        private readonly IConfiguration _configuration;
        private string _serviceId =string.Empty;

        public ConsulRegisterService(IConsulClient consulClient ,IConfiguration configuration)
        {
            _consulClient = consulClient;
            _configuration = configuration;
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            var ServiceName = _configuration.GetValue<string>(key: "ServiceConfiguration:ServiceName");
            var host = _configuration.GetValue<string>(key: "ServiceConfiguration:Host");
            var port = _configuration.GetValue<int>(key: "ServiceConfiguration:Port");
            _serviceId=$"{ServiceName}---{Guid.NewGuid()}";
            var taglist = new string[] { ServiceName };
            var register = new AgentServiceRegistration()
            {
                ID = _serviceId,
                Name = ServiceName,
                Port = port,
                Address = host,
                Tags=taglist
            };
            await _consulClient.Agent.ServiceRegister(register,cancellationToken);

        }

        public async Task StopAsync(CancellationToken cancellationToken)
        {
           await _consulClient.Agent.ServiceDeregister(_serviceId,cancellationToken);
        }
    }
}
