import styled from '@emotion/styled';
import { Layout } from 'antd';
const { Sider } = Layout;

export const StyledLayout = styled(Layout)`
  &&& {
    min-height: 100vh;
    width: 1200px;
    background: linear-gradient(135deg, #e6f7ff 0%, #f0f7ff 100%);
  }
`;

export const StyledSider = styled(Sider)`
  &&& {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
    width: 280px !important;
    min-width: 280px !important;
    max-width: 280px !important;
    
    .ant-layout-sider-children {
      width: 100%;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    
    // Скрываем стандартный триггер Ant Design
    .ant-layout-sider-trigger {
      background: rgba(255, 255, 255, 0.1);
      color: white;
      border-top: 1px solid rgba(255, 255, 255, 0.2);
      
      &:hover {
        background: rgba(255, 255, 255, 0.2);
      }
    }
    
    // Стилизация меню
    .ant-menu {
      background: transparent;
      border-right: none;
      padding: 20px 0;
      width: 100% !important;
      flex: 1;
      
      .ant-menu-inner {
        width: 100%;
        overflow: hidden;
      }
      
      // Элементы меню
      .ant-menu-item {
        margin: 8px 16px;
        border-radius: 12px;
        height: 50px;
        display: flex;
        align-items: center;
        transition: all 0.3s ease;
        border: 2px solid transparent;
        width: calc(100% - 32px) !important;
        box-sizing: border-box;
        
        // Гарантируем, что текст не выходит за границы
        .ant-menu-title-content {
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: 500;
        }
        
        // Иконки
        .anticon {
          font-size: 18px;
          margin-right: 12px;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }
        
        // Не выбранный элемент
        &:not(.ant-menu-item-selected) {
          color: rgba(255, 255, 255, 0.8);
          background: rgba(255, 255, 255, 0.05);
          
          &:hover {
            color: white;
            background: linear-gradient(135deg, #52c41a 0%, #73d13d 100%);
            border-color: #389e0d;
            border-color: rgba(255, 255, 255, 0.3);
            transform: translateX(5px) scale(1.02);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            
            .anticon {
              transform: scale(1.1);
              color: #fff;
            }
          }
        }
        
        // Выбранный элемент
        &.ant-menu-item-selected {
          background: rgba(255, 255, 255, 0.2);
          color: yellow;
          font-weight: 600;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          border: 2px solid rgba(255, 255, 255, 0.4);
          
          &::after {
            display: none;
          }
          
          .anticon {
            color: #fff;
            filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
          }
          
          &:hover {
            background: rgba(255, 255, 255, 0.25);
            transform: translateX(3px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
          }
        }
      }
    }
  }
`;
