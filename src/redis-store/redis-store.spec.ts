import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { RedisStore } from './redis-store';

describe('RedisStore', () => {
  let store: RedisStore;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RedisStore, ConfigService],
    }).compile();
    store = module.get<RedisStore>(RedisStore);
  });

  it('should be defined', () => {
    expect(store).toBeDefined();
  });

  describe('CRD', () => {
    beforeAll(async () => {
      store.create('testKey', 'testValue');
    });

    it('get', async () => {
      const storedData = await store.findByKey('testKey');
      expect(storedData).toEqual('testValue');
    });

    it('set', async () => {
      const TEST_KEY = 'set_test_key';
      const TEST_VALUE = 'set_test_value';
      await store.create(TEST_KEY, TEST_VALUE);
      expect(await store.findByKey(TEST_KEY)).toEqual(TEST_VALUE);
    });

    it('del', async () => {
      const TEST_KEY = 'del_test_key';
      const TEST_VALUE = 'del_test_value';
      await store.create(TEST_KEY, TEST_VALUE);

      expect(await store.deleteByKey(TEST_KEY)).toEqual(1);
    });

    afterAll(async () => {
      await store.clear();
    });
  });
});
