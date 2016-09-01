import test from 'ava';
import getdate from './getdate';

const date = new Date("2012-11-22T07:42:45.456Z");

test('容错处理', async t => {
    t.not(getdate(''), '2012-11-22');
    t.not(getdate(null), '2012-11-22');
    t.not(getdate(void 0), '2012-11-22');
    t.not(getdate({}), '2012-11-22');

    t.is(getdate(date), '2012-11-22');
});

test('2012 年 11 月 22日', async t => {
    t.is(getdate('2012 年 11 月22 日'), '2012-11-22');
});

test('yyyy-mm-dd', async t => {
    t.is(getdate('2012-11-22'), '2012-11-22');
});

test('yyyy.mm.dd', async t => {
    t.is(getdate('2012.11.22'), '2012-11-22');
});

test('yyyy/mm/dd', async t => {
    t.is(getdate('2012/11/22'), '2012-11-22');
});

test('mm-dd-yyyy', async t => {
    t.is(getdate('11-22-2012'), '2012-11-22');
});

test('mm.dd.yyyy', async t => {
    t.is(getdate('11.22.2012'), '2012-11-22');
});

test('mm/dd/yyyy', async t => {
    t.is(getdate('11/22/2012'), '2012-11-22');
});


test('DateString', async t => {
    t.is(getdate(date.toDateString()), '2012-11-22');
});

test('UTC', async t => {
    t.is(getdate(date.toUTCString()), '2012-11-22');
});

test('Greenwich', async t => {
    t.is(getdate('' + date), '2012-11-22');
});

test('ISO', async t => {
    t.is(getdate(date.toISOString()), '2012-11-22');
});