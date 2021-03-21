
function notice(option) {
  option.title = option.title || '提示';
  option.msg = option.msg || '';
  option.duration = option.duration || 3000;
  /*Message.error({
    title: option.title,
    message: option.msg,
    duration: option.duration
  });*/
}

let validateUtils = {
  notNull(val, msg, title, duration){
    if(this.isNull(val)){
      notice({msg, title, duration});
      throw 'validate failed.';
    }
  },
  notEmpty(val, msg, title, duration){
    if(this.isNull(val) || val.length === 0){
      notice({msg, title, duration});
      throw 'validate failed.';
    }
  },
  notANumber(val, msg, title, duration){
    if(!this.isNumber(val)){
      notice({msg, title, duration});
      throw 'validate failed.';
    }
  },
  /**
   * @doc 最大长度校验
   * @param val
   * @param maxLength
   * @param msg
   * @param title
   * @param duration
   * @returns {boolean}
   */
  notExceedMaxLength(val, maxLength, msg, title, duration){
    if(val && val.length > maxLength){
      notice({msg, title, duration});
      throw 'validate failed.';
    }
  },

  isNull(val){
    if(val === null || val === undefined){
      return true;
    }
    return false;
  },
  isNumber(val){
    return !isNaN(val);
  },
  isEmpty(val){
    if(val === null || val === undefined || val.length === 0){
      return true;
    }
    return false;
  }
};
