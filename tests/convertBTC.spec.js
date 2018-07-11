const nock = require('nock');
const chalk = require('chalk');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const expect = chai.expect;

chai.use(sinonChai);

const convertBTC = require('../src/convertBTC');

describe('Convert BTC', () => {
  let stubConsole;

  const responseMock = {
    success: true,
    time: '2018-07-10 19:41:31',
    price: 6380.45,
  };

  beforeEach(() => {
    stubConsole = sinon.stub(console, 'info');
  });

  afterEach(() => {
    stubConsole.restore();
  });

  it('should use USD as currency and 1 as amount default', async () => {
    // https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=USD&amount=1
    nock('https://apiv2.bitcoinaverage.com')
      .get('/convert/global')
      .query({ from: 'BTC', to: 'USD', amount: 1 })
      .reply(200, responseMock);

    await convertBTC();
    expect(stubConsole).to.have.been.calledWith(`${chalk.red(1)} BTC to ${chalk.cyan('USD')} = ${chalk.yellow(6380.45)}`);
  });

  it('should use USD as currency and 10 as amount default', async () => {
    // https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=USD&amount=1
    nock('https://apiv2.bitcoinaverage.com')
      .get('/convert/global')
      .query({ from: 'BTC', to: 'USD', amount: 10 })
      .reply(200, responseMock);

    await convertBTC('USD', 10);
    expect(stubConsole).to.have.been.calledWith(`${chalk.red(10)} BTC to ${chalk.cyan('USD')} = ${chalk.yellow(6380.45)}`);
  });

  it('should use BRL as currency and 1 as amount default', async () => {
    // https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=USD&amount=1
    nock('https://apiv2.bitcoinaverage.com')
      .get('/convert/global')
      .query({ from: 'BTC', to: 'BRL', amount: 1 })
      .reply(200, responseMock);

    await convertBTC('BRL');
    expect(stubConsole).to.have.been.calledWith(`${chalk.red(1)} BTC to ${chalk.cyan('BRL')} = ${chalk.yellow(6380.45)}`);
  });

  it('should message user when API reply with error', async () => {
    // https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=USD&amount=1
    nock('https://apiv2.bitcoinaverage.com')
      .get('/convert/global')
      .query({ from: 'BTC', to: 'USD', amount: 10 })
      .replyWithError('Error');

    await convertBTC('USD', 10);
    expect(stubConsole).to.have.been.calledWith(chalk.red('Something went wrong with API call, try in a few seconds again.'));
  });
});

