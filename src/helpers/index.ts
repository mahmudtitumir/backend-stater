import crypo from 'crypto';

const SECRET = 'yourAPIsecret';

export const random = () => crypo.randomBytes(128).toString('base64');
export const authentication = (salt: string, password: string) => {
    return crypo
        .createHmac('sha256', [salt, password].join('/'))
        .update(SECRET)
        .digest('hex');
};
