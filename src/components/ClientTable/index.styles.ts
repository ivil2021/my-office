import styled from '@emotion/styled';
import { Button, Table } from 'antd';
import Link from 'antd/es/typography/Link';
// import Link from 'antd/es/typography/Link';

export const ClientTableContainer = styled.div`
  margin: 0 auto;
  margin-left: 5px;
  padding: 30px;
  text-align: center;
  border-radius: 16px;
  border: 2px solid #1890ff;
  background: linear-gradient(135deg, #e6f7ff 0%, #f0f7ff 100%);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
`;

export const StyledTable = styled(Table)`
// Основные бордеры и фон таблицы
.ant-table {
  border: 2px solid #1890ff;
  border-radius: 12px;
  overflow: hidden;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

// Контейнер таблицы
.ant-table-container {
  border-radius: 12px;
}

// Заголовки колонок
.ant-table-thead > tr > th {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: 600;
  font-size: 14px;
  border-bottom: 3px solid #5a6cdb;
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  padding: 16px;
  text-align: center;
  
  &:last-child {
    border-right: none;
  }
  
  &:hover {
    background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
  }
}

// Ячейки таблицы
.ant-table-tbody > tr > td {
  border-bottom: 1px solid #e8f4fd;
  border-right: 1px solid #f0f0f0;
  padding: 12px 16px;
  transition: all 0.3s ease;
  
  &:last-child {
    border-right: none;
  }
}

// Чередование цветов строк
.ant-table-tbody > tr:nth-child(even) {
  background-color: #fafafa;
}

.ant-table-tbody > tr:nth-child(odd) {
  background-color: #ffffff;
}

// Эффект при наведении на строку
.ant-table-tbody > tr:hover > td {
  background-color: #e6f7ff !important;
  border-bottom: 2px solid #1890ff;
  border-top: 1px solid #1890ff;
  transform: translateY(-1px);
}

// Убираем бордер у последней строки
.ant-table-tbody > tr:last-child > td {
  border-bottom: none;
}

// Стили для кнопок в колонке действий
.ant-btn-text {
  color: #666;
  border-radius: 6px;
  padding: 6px 8px;
  border: 1px solid transparent;
  transition: all 0.3s ease;
  
  &:hover {
    color: #1890ff;
    background-color: rgba(24, 144, 255, 0.1);
    border-color: #1890ff;
    transform: scale(1.05);
  }

  .anticon {
    font-size: 16px;
  }
}

// Кнопка удаления
.ant-btn-dangerous {
  color: #ff4d4f;
  border: 1px solid transparent;
  
  &:hover {
    color: #ff7875;
    background-color: rgba(255, 77, 79, 0.1);
    border-color: #ff4d4f;
    transform: scale(1.05);
  }
}

// Состояние загрузки
.ant-table-placeholder {
  border-bottom: none;
  
  .ant-empty-description {
    color: #666;
    font-size: 16px;
  }
}

.ant-pagination {
  margin-top: 24px;
  padding: 0 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  // Общие стили для элементов пагинации
  .ant-pagination-item,
  .ant-pagination-prev,
  .ant-pagination-next,
  .ant-pagination-jump-prev,
  .ant-pagination-jump-next {
    border: 2px solid #e8e8e8;
    border-radius: 8px;
    margin: 0 4px;
    transition: all 0.3s ease;
    
    &:hover {
      border-color: #1890ff;
      transform: translateY(-2px);
      box-shadow: 0 2px 8px rgba(24, 144, 255, 0.2);
    }
    
    a {
      color: #666;
      transition: color 0.3s ease;
    }
    
    &:hover a {
      color: #1890ff;
    }
  }

  // Активная страница
  .ant-pagination-item-active {
    background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
    border-color: #1890ff;
    
    a {
      color: white;
      font-weight: 600;
    }
    
    &:hover {
      background: linear-gradient(135deg, #096dd9 0%, #0050b3 100%);
      border-color: #096dd9;
      
      a {
        color: white;
      }
    }
  }

  // Кнопки вперед/назад
  .ant-pagination-prev,
  .ant-pagination-next {
    .ant-pagination-item-link {
      border-radius: 8px;
      background: white;
      display: flex;
      align-items: center;
      justify-content: center;
      
      &:hover {
        background: #f0f7ff;
        border-color: #1890ff;
      }
    }
  }

  // Многоточие
  .ant-pagination-jump-prev,
  .ant-pagination-jump-next {
    .ant-pagination-item-container {
      .ant-pagination-item-ellipsis {
        color: #999;
        font-size: 12px;
      }
      
      .ant-pagination-item-link-icon {
        color: #1890ff;
      }
    }
  }

  // Отключенные кнопки
  .ant-pagination-disabled {
    opacity: 0.5;
    cursor: not-allowed;
    
    &:hover {
      border-color: #e8e8e8;
      transform: none;
      box-shadow: none;
    }
    
    .ant-pagination-item-link {
      background: #f5f5f5;
      
      &:hover {
        background: #f5f5f5;
        border-color: #e8e8e8;
      }
    }
  }

  // Селектор размера страницы
  .ant-pagination-options {
    margin-left: 16px;
    
    .ant-select {
      .ant-select-selector {
        border: 2px solid #e8e8e8;
        border-radius: 6px;
        
        &:hover {
          border-color: #1890ff;
        }
      }
    }
  }

  // Быстрый переход
  .ant-pagination-options-quick-jumper {
    margin-left: 16px;
    
    input {
      border: 2px solid #e8e8e8;
      border-radius: 6px;
      padding: 4px 8px;
      
      &:focus {
        border-color: #1890ff;
        box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
      }
      
      &:hover {
        border-color: #1890ff;
      }
    }
  }

  // Текст с количеством элементов
  .ant-pagination-total-text {
    margin-right: 16px;
    color: #666;
    font-weight: 500;
  }
}
`;

// Стилизованная кнопка создания
export const CreateButton = styled(Button)`
  background: linear-gradient(135deg, #52c41a 0%, #73d13d 100%);
  border: 2px solid #52c41a;
  border-radius: 8px;
  font-weight: 600;
  padding: 8px 20px;
  height: auto;
  
  &:hover {
    background: linear-gradient(135deg, #389e0d 0%, #52c41a 100%);
    border-color: #389e0d;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(82, 196, 26, 0.3);
  }
`;

// export const MinimalHomeLink = styled(Link)`
//   display: inline-flex;
//   align-items: center;
//   justify-content: center;
//   margin-top: 20px;
//   padding: 8px 16px;
//   background: transparent;
//   border: 2px solid #1890ff;
//   border-radius: 6px;
//   color: #1890ff;
//   text-decoration: none;
//   font-weight: 500;
//   transition: all 0.3s ease;
  
//   &:hover {
//     background: #1890ff;
//     color: white;
//     transform: translateY(-1px);
//   }
// `;
