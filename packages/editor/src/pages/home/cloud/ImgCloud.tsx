import { Button, Image, Alert, Pagination, Upload, Space, Popover, Tooltip, Spin } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { CheckOutlined, CopyOutlined, InfoCircleOutlined, RedoOutlined, UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import copy from 'copy-to-clipboard';
import { message } from '@/utils/AntdGlobal';
import storage from '@/utils/storage';
import { getImgList } from '@/api/cdn';
import styles from './index.module.less';

export default function ImgCloud() {
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState<number>(100);
  const [current, setCurrent] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(24);
  const [state, setState] = useState(false);
  const [list, setList] = useState<
    Array<{ id: number; type: string; origin_name: string; file_name: string; size: number; userName: string; createdAt: string; url: string }>
  >([]);

  useEffect(() => {
    getList(current);
  }, [current]);

  // 加载页面列表
  const getList = async (pageNum: number = current) => {
    setLoading(true);
    try {
      const res = await getImgList({
        pageNum,
        pageSize,
      });
      setTotal(res.total || 0);
      setList(res.list || []);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  // 切换页码和每页条数回调
  const handleChange = (_current: number, size: number) => {
    setCurrent(_current);
    setPageSize(size);
  };

  const props: UploadProps = useMemo(() => {
    const token = storage.get('token');
    const baseApi = import.meta.env.VITE_BASE_API;
    return {
      name: 'file',
      action: `${baseApi}/cloud/upload/files`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      showUploadList: false,
      onChange(info) {
        const { status, response } = info.file;
        setLoading(true);
        if (status === 'done') {
          setLoading(false);
          if (response.code == 0) {
            getList();
          } else {
            message.error(response.message);
          }
        } else if (status === 'error') {
          setLoading(false);
          message.error(`上传失败，请稍后重试`);
        }
      },
    };
  }, []);

  return (
    <div className={styles.imgCloud}>
      <div className={styles.content}>
        <Alert type="info" showIcon message="Marsview提供在线图片云服务，在开发页面过程中，涉及到背景图片可直接通过云服务完成；" />
        <Space size={20}>
          <Upload {...props}>
            <Button type="primary" icon={<UploadOutlined />}>
              上传
            </Button>
          </Upload>
          <Button shape="circle" icon={<RedoOutlined />} onClick={() => getList()}></Button>
        </Space>
      </div>
      <Spin spinning={loading} size="large">
        <div className={styles.imgList}>
          {list.map((item) => {
            return (
              <div className={styles.imgCard} key={item.id}>
                <div className={styles.imgRound}>
                  <div className={styles.icons}>
                    <Space>
                      <Popover
                        placement="right"
                        title={item.origin_name}
                        content={
                          <div>
                            <p>
                              <span style={{ display: 'inline-block', width: 80 }}>大小：</span>
                              <span>{(item.size / 1024).toFixed(2)} KB</span>
                            </p>
                            <p>
                              <span style={{ display: 'inline-block', width: 80 }}>创建时间：</span>
                              <span>{item.createdAt}</span>
                            </p>
                            <p>
                              <span style={{ display: 'inline-block', width: 80 }}>创建人：</span>
                              <span>{item.userName.split('@')[0]}</span>
                            </p>
                          </div>
                        }
                        trigger="click"
                      >
                        <InfoCircleOutlined />
                      </Popover>
                      <Tooltip title="复制">
                        {state ? (
                          <CheckOutlined />
                        ) : (
                          <CopyOutlined
                            onClick={() => {
                              copy(item.url);
                              setState(true);
                              setTimeout(() => {
                                setState(false);
                              }, 3000);
                              message.success('复制成功');
                            }}
                          />
                        )}
                      </Tooltip>
                    </Space>
                  </div>
                  <Image src={item.type.startsWith('image') ? item.url : `${import.meta.env.VITE_CDN_URL}/js.png`} height={'100%'} />
                </div>
                <div className={styles.desc}>{(item.size / 1024).toFixed(2)} KB</div>
              </div>
            );
          })}
        </div>
      </Spin>
      <div className={styles.imgPagination}>
        <Pagination total={total} current={current} pageSize={pageSize} align="end" showSizeChanger={false} onChange={handleChange} />
      </div>
    </div>
  );
}
