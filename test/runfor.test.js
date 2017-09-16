import runFor from '../src';

jest.useFakeTimers();

let time = 1000 / 60;
Date.now = () => {
  time += 1000 / 60;
  return time;
};

test('Should call progress function', (done) => {
  const mockFunc = jest.fn();

  const runner = runFor(() => {
    mockFunc();
  }, 1000);

  runner.onDone(() => {
    done();
  });

  jest.runTimersToTime(2000);
  expect(mockFunc).toBeCalled();
});

test('Should call progress function multiple times', (done) => {
  const calls = [];

  const runner = runFor(p => calls.push(p), 1000);

  runner.onDone(() => {
    done();
  });

  jest.runTimersToTime(2000);
  expect(calls).toMatchSnapshot();
});
