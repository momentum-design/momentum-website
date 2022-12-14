const { MomentumAbstractType, mfs, mconvert } = require('momentum-constructor-common');
const write = require('write');
const path = require('path');
const { my_path } = require('../../myconfig');

const folderPath = path.resolve(my_path.scss,'_colors');
const momentumPath = path.resolve(my_path.assets_momentum, 'color');

const rgbaStr = (rgba)=> {
    return `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`
};

const generateScss = (file) => {
    let _scss = [];
    Object.values(file.content).forEach((subObj)=>{
        Object.keys(subObj).forEach((key)=>{
            if(subObj[key].rgba) {
                _scss.push(`$${key}:${rgbaStr(subObj[key].rgba)};`);
            } else {
                const _line = [];
                Object.values(subObj[key].colors).forEach((_color)=>{
                    _line.push(rgbaStr(_color.rgba));
                });
                _scss.push(`$${key}:linear-gradient(${_line.join(',')});`);
            }
        });
    });
    write.sync(path.join(folderPath, `${file.name}.scss`), _scss.join('\n'), { overwrite: true });
    console.log(`create ${file.name}.scss under ${folderPath}`);
};

const buildColor = async ()=> {
    let files = mfs.read(MomentumAbstractType.color);
    mfs.saveFiles(files, momentumPath);
    files = mconvert.flat(files, MomentumAbstractType.color);
    Object.values(files).forEach((file)=>{
        generateScss(file);
    });
};

exports.buildColor = buildColor;