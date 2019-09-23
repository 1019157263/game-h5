import json
import re
import sys
import time

import requests
from bs4 import BeautifulSoup

import RSAJS
from hex2b64 import HB64


class Loginer():
    sessions = requests.Session()
    time = int(time.time())

    def __init__(self, user, passwd):
        self.user = str(user)
        self.passwd = str(passwd)

    def header(self):   # pylint: disable=E0202
        self.header = {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2',
            'Connection': 'keep-alive',
            'Content-Length': '470',
            'Content-Type': 'application/x-www-form-urlencoded',
            # 'Host':'jwgl.suse.edu.cn',
            'Referer': 'http://jwgl.suse.edu.cn/jwglxt/xtgl/login_slogin.html?language=zh_CN&_t='+str(self.time),
            'Upgrade-Insecure-Requests': '1',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:58.0) Gecko/20100101 Firefox/58.0',
        }

    def reflush_time(self):
        self.time = int(time.time())

    def get_public(self):
        url_ll = 'http://61.139.105.138/xtgl/login_getPublicKey.html?time=' + \
            str(self.time)
        r = self.sessions.get(url_ll)
        # print('密匙：')
        # print(r.text)
        self.pub = r.json()

    def get_csrftoken(self):
        url = 'http://61.139.105.138/xtgl/login_slogin.html?language=zh_CN&_t=' + \
            str(self.time)
        r = self.sessions.get(url)
        r.encoding = r.apparent_encoding
        soup = BeautifulSoup(r.text, 'html.parser')
        self.token = soup.find(
            'input', attrs={'id': 'csrftoken'}).attrs['value']
        # print('令牌：')
        # print(self.token)

    def process_public(self, str):
        self.exponent = HB64().b642hex(self.pub['exponent'])
        self.modulus = HB64().b642hex(self.pub['modulus'])
        rsa = RSAJS.RSAKey()
        rsa.setPublic(self.modulus, self.exponent)
        # print('密码：')
        cry_data = rsa.encrypt(str)
        # print(cry_data)
        return HB64().hex2b64(cry_data)

    def post_data(self):
        try:
            url = 'http://61.139.105.138/xtgl/login_slogin.html?time=' + \
                str(self.time)
            header = {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Encoding': 'gzip, deflate',
                'Accept-Language': 'zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2',
                'Connection': 'keep-alive',
                'Content-Length': '470',
                'Content-Type': 'application/x-www-form-urlencoded',
                # 'Host':'jwgl.suse.edu.cn',
                'Referer': 'http://jwgl.suse.edu.cn/jwglxt/xtgl/login_slogin.html?language=zh_CN&_t='+str(self.time),
                'Upgrade-Insecure-Requests': '1',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:58.0) Gecko/20100101 Firefox/58.0',
            }
            self.header = header
            data = {
                'csrftoken': self.token,
                'yhm': self.user,
                'mm': self.process_public(self.passwd),
              #  'mm': self.process_public(self.passwd),


            }
            print("提交的数据是：")
            print(json.dumps(data, ensure_ascii=False,
                             sort_keys=True, indent=4, separators=(',', ': ')))

            self.req = self.sessions.post(
                url=url, headers=header, data=data)
            # print(self.req.text)
            self.cookie = self.req.request.headers['cookie']
            print(self.cookie)
            ppot = r'用户名或密码不正确'
            if re.findall(ppot, self.req.text):
                print('用户名或密码错误,请查验..')
                sys.exit()
            return self.cookie
        except:
            print('登录失败,请检查网络配置或检查账号密码...')
            sys.exit()

    # def index(self):
    #     url_index = "http://61.139.105.138/xtgl/index_initMenu.html"
    #     # data_index = self.sessions.get(url_index)
    #     # print(data_index.text)

    def chengji(self):
                #url_c = 'http://jwgl.suse.edu.cn/jwglxt/cjcx/cjcx_cxDgXscj.html?doType=query&gnmkdm=N305005 '
        url_c = 'http://61.139.105.138/cjcx/cjcx_cxDgXscj.html?doType=query&gnmkdm=N305005'
        suju = {
            'xnm': '',
            'xqm': '',
            '_search': 'false',
            'nd': '1552022952332',
            'queryModel.showCount': '5000',
            'queryModel.currentPage': '1',
            'queryModel.sortName': '',
            'queryModel.sortOrder': 'asc',
            'time': '0',

        }
        data_c = self.sessions.post(url_c, data=suju)
        #print(json.dumps(data_c.json(), ensure_ascii=False,sort_keys=True, indent=4, separators=(',', ': ')))
        return data_c.json()

    def gerenxx(self):
        url_r = f'http://61.139.105.138/xsxxxggl/xsgrxxwh_cxXsgrxx.html?gnmkdm=N100801&layout=default&su={self.user}'
        data_r = self.sessions.get(url_r)
        # print(data_r.text)
        soup = BeautifulSoup(data_r.text, 'html.parser')
        name = soup.find_all('p', attrs={'class': 'form-control-static'})
        li = []
        for i in name:
            li.append(str(i.string).replace(
                '\t', '').replace('\r', '').replace('\n', ''))
        print('获取到的个人信息为：')
        print(li)

    def kecb(self):
        url_b = 'http://61.139.105.138/kbcx/xskbcx_cxXsKb.html?gnmkdm=N253508'
        suju_b = {
            'xnm': '2018',
            'xqm': '12',
        }
        data_b = self.sessions.post(url_b, data=suju_b)
        # print(data_b.text)

        data_b = data_b.json()
        #print(json.dumps(data_b, ensure_ascii=False,sort_keys=True, indent=4, separators=(',', ': ')))
        li = []
        for i in data_b['kbList']:
            #print(f"<li class=\"list-group-item\">[日子]{i['xqjmc']}{i['jc']}[课程]：{i['kcmc']}[周数]{i['zcd']}[老师]：{i['xm']}[地点]：{i['cdmc']}</li>")
            li.append({'日子': i['xqjmc'], '节数': i['jc'], '课程名': i['kcmc'],
                       '周数': i['zcd'], '老师': i['xm'], '地点': i['cdmc']})
            # print('课程：'+json.dumps(i['kcmc'], ensure_ascii=False,sort_keys=True, indent=4, separators=(',', ': '))+f'老师：{data_b['kbList']['xm']}')
        print(json.dumps(li, ensure_ascii=False,
                         sort_keys=True, indent=4, separators=(',', ': ')))
        return li

    def sycb(self):
        pass


name=input('username：')
pwd=input('pwd：')
a = Loginer(name, pwd)  # 用户名，密码1
# a = Loginer('16011038025', 'a1019157263')
#a = Loginer('16011038023', 'zyx19960130')
# a = Loginer('16011038026', 'zyj666')  # 用户名，密码
a.reflush_time()  # 时间
a.get_csrftoken()  # 获取动态令牌
a.get_public()  # 获取动态公钥
a.post_data()  # 登陆
a.gerenxx()  # 个人信息
data = a.chengji()['items']  # 成绩
print(f"识别出一共有{len(data)}门课")


hx = [
    # 机械制造方向
    "高等数学(二)",
    "高等数学A",
    "电工电子基础",
    "工程制图A",
    "互换性与测量技术基础",
    "机械工程材料B",
    "材料力学",
    "机械原理",
    "机械设计",
    "机械制造技术基础A",
    "机电传动控制",
    "生产实习",
    "机械制造装备设计",
    "先进制造技术",
    "机制专业综合课程设计",
    # 机械设计方向
    "高等数学A",
    "电工电子基础",
    "工程制图A",
    "互换性与测量技术基础",
    "机械工程材料B",
    "材料力学",
    "机械原理",
    "机械设计",
    "机械制造技术基础A",
    "机电传动控制",
    "生产实习",
    "机械设计学",
    "机械系统设计",
    "机设专业综合课程设计",
]

xx = 0
xf_jd = 0
xf = 0
for i in data:
    if 'xf' in i.keys():
        xx += 1
        xf_jd = xf_jd+(float(i['jd'])*float(i['xf']))
        xf += float(i['xf'])
        print(f"{xx}课程名称：{i['kcmc']},绩点：{i['jd']},学分：{i['xf']}")
    else:
        print(f"[异常]{i['kcmc']}没有学分或绩点")

credit_pj = xf_jd/xf
print(f'总（学分*绩点）={xf_jd}')
print(f'总（学分）={xf}')
print(f'总（学分*绩点）/学分={credit_pj}')

# 专业
print('学位绩点'+"-"*50)
xx = 0
xf_jd = 0
xf = 0

strxx = ''
strxfh = ''
print('核心课程信息：'+"-"*50)
data_credit = {
}

for i in data:
    if i['kcmc'] in hx:
        if 'xf' in i.keys():
            data_credit[i['kcmc']] = [i['jd'], i['xf']]
            strxx = strxx+f"+({i['jd']}*{i['xf']})"
            strxfh += f"+{i['xf']}"
            xx += 1
            xf_jd = xf_jd+(float(i['jd'])*float(i['xf']))
            xf += float(i['xf'])
            print(f"{xx}课程名称：{i['kcmc']},绩点：{i['jd']},学分：{i['xf']}")
        else:
            print(f"[异常]{i['kcmc']}没有学分或绩点")
# print(data_credit)
xj_new = 0
xfh_new = 0
strxx_n = ''
strxfh_n = ''
num=0
print('核心最新数据：'+"-"*50)
li=[oo for oo in data_credit.keys()]
for itme in data_credit.values():
    # print(itme)
    num+=1
    xj_new += float(itme[0])*float(itme[1])
    xfh_new += float(itme[1])
    strxx_n = strxx_n+f"+({itme[0]}*{itme[1]})"
    strxfh_n += f"+{itme[1]}"
    print(f"{num}课程名称：{li[num-1]},绩点：{itme[0]},学分：{itme[1]}")
    

# print(xj_new)
# print(xfh_new)
# print(strxx_n)
# print(strxfh_n)

credit_pj = xj_new/xfh_new
print(f'总（学分*绩点）={xj_new}')
print(f'总（学分）={xfh_new}')
print(f'总（学分*绩点）/学分={credit_pj}')

print(f"绩点×学分的和算式为：{strxx_n[1::]}={xj_new}")
print(f"学分的和算式为：{strxfh_n[1::]}={xfh_new}")
print(f"平均学分绩点的算式为：({strxx_n[1::]})/({strxfh_n[1::]})={credit_pj}")
# a.kecb()  # 课程表
# 登陆类结束
