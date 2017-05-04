# daily-signin

[![Docker Automated buil](https://img.shields.io/docker/automated/playdingnow/daily-signin.svg?style=flat-square)](https://hub.docker.com/r/playdingnow/daily-signin/)
[![Docker Pulls](https://img.shields.io/docker/pulls/playdingnow/daily-signin.svg?style=flat-square)](https://hub.docker.com/r/playdingnow/daily-signin/)

smzdm, v2ex, jd jr, jd daily signin script

什么值得买, v2ex, 京东金融, 京东每日签到脚本

# Getting Start

通过配置参数，便可一键使用

## Enviroment

| NAME| CN | EN  |
| --- | --- | --- |
| SITE | 默认是 smzdm，[avaliable sites](#avaliable-sites) | smzdm or v2ex or jd, [avaliable sites](#avaliable-sites) |
| DUSERNAME | 对应站点的用户名 | username of your account |
| DPASSWORD | 对应站点的密码 | password of yuur account |
| ISBASE64 | 是否对需要用 base64 decode 密码 | Whether it is necessary to use the base64 decode password |
| DEBUG | NODEJS 常见的 debug flag，可以用 `nightmare:action*` 来查看更多信息 | NODE JS common debugging signs, you can use `nightmares: action *` to see more information |


## Avaliable Sites

 - [smzdm](https://smzdm.com)
 - [v2ex](https://v2ex.com)
 - [jd](https://vip.jd.com)
 - [jdjr](https://vip.jr.jd.com)

## Docker

```shell
docker run --rm \
  -e SITE={{site:smzdm}} \
  -e DUSERNAME={{username}} \
  -e DPASSWORD={{password}} \
  playdingnow/daily-signin
```

or

```shell
docker run --rm \
  -e SITE={{site:smzdm}} \
  -e DUSERNAME={{username}} \
  -e DPASSWORD={{password}} \ # encoded base64 password
  -e ISBASE64=1 \
  playdingnow/daily-signin
```

### Docker Example Output

![](http://om4h4iqhe.bkt.clouddn.com/daily-signin-docker-output.png)
