import Modal from './modal';
import FormInput from './form_input';
import FormSelect from './form_select';
import FormSelect2 from './form_select2';
import FormField from './form_field';
import Button from './button';
import { t } from '../locale/locale';
import { h } from './element';
import { cssPrefix } from '../config';

const fieldLabelWidth = 100;

export default class ModalRightMenu extends Modal {
  constructor(zbbmData, cellPro) {
    // 是否表头
    const headers = new FormField(
      new FormSelect('false',
        ['false', 'true'],
        '250px',
        it => t(`rightMenu.headersType.${it}`)),
      { required: true },
      `${t('rightMenu.headers')}:`,
      fieldLabelWidth,
    );
    // 指标编码
    const zbbm = new FormField(
      new FormSelect2('1', zbbmData,
        '250px'),
      { required: false },
      `${t('rightMenu.zbbm')}:`,
      fieldLabelWidth,
    );
    // 数据源
    const datasource = new FormField(
      new FormInput('250px', ''),
      { required: false },
      `${t('rightMenu.datasource')}:`,
      fieldLabelWidth,
    );
    // 表
    const table = new FormField(
      new FormInput('250px', ''),
      { required: false },
      `${t('rightMenu.tablename')}:`,
      fieldLabelWidth,
    );

    // 字段
    const field = new FormField(
      new FormInput('250px', ''),
      { required: false },
      `${t('rightMenu.fieldname')}:`,
      fieldLabelWidth,
    );

    super(t('contextmenu.rightMenu'), [
      h('div', `${cssPrefix}-form-fields`).children(
        headers.el,
      ),
      h('div', `${cssPrefix}-form-fields`).children(
        zbbm.el,
      ),
      h('div', `${cssPrefix}-form-fields`).children(
        datasource.el,
      ),
      h('div', `${cssPrefix}-form-fields`).children(
        table.el,
      ),
      h('div', `${cssPrefix}-form-fields`).children(
        field.el,
      ),
      h('div', `${cssPrefix}-buttons`).children(
        new Button('cancel').on('click', () => this.btnClick('cancel')),
        new Button('remove').on('click', () => this.btnClick('remove')),
        new Button('save', 'primary').on('click', () => this.btnClick('save')),
      ),
    ]);


    this.headers = headers;
    this.zbbm = zbbm;
    this.datasource = datasource;
    this.table = table;
    this.field = field;
    this.change = () => {};
    this.cellPro = cellPro;
  }

  btnClick(action) {
    if (action === 'cancel') {
      this.hide();
    } else if (action === 'remove') {
      this.change('remove');
      this.hide();
    } else if (action === 'save') {
      const headers = this.headers.val();
      const zbbm = this.zbbm.val();
      const datasource = this.datasource.val();
      const table = this.table.val();
      const field = this.field.val();
      this.change('save',
        {
          headers, zbbm, datasource, table, field,
        });
      this.hide();
    }
  }

  // validation: { mode, ref, validator }
  setValue(v) {
    const {
      headers, zbbm, datasource, table, field, cellPro,
    } = this;
    if (v) {
      headers.val(v.headers || 'false');
      zbbm.val(v.zbbm || '');
      datasource.val(v.datasource || '');
      table.val(v.table || '');
      field.val(v.field || '');
    } else if (this.cellPro) {
      headers.val('false');
      zbbm.val('');
      datasource.val(cellPro.datasource || '');
      table.val(cellPro.table || '');
      field.val(cellPro.field || '');
    } else {
      headers.val('false');
      zbbm.val('');
      datasource.val('');
      table.val('');
      field.val('');
    }
    this.show();
  }
}
