import sys
sys.path.append("/home/pi/robotics/roboclaw")

from roboclaw_3 import Roboclaw
import serial

import RPi.GPIO as GPIO
import os
from subprocess import Popen

from pyzbar.pyzbar import decode

import requests
import json
import os

from pyzbar import pyzbar
import argparse
import datetime

import time

import http.client
import urllib.parse
import urllib.request

import requests
import cv2 #read image/camera/video input
from pyzbar.pyzbar import decode

HOST = '192.168.0.100'
PORT = 4242

StationTimeL = [ 180 , 191 , 99, 336, 158 ,98 , 76 , 318 , 242]
StationTimeS = [ 180 , 48 , 99, 336, 158 ,98 , 76 , 126 , 134]

def barcode_scan():
    # construct the argument parser and parse the arguments
    ap = argparse.ArgumentParser()
    ap.add_argument("-o", "--output", type=str, default="barcodes.csv",
        help="path to output CSV file containing barcodes")
    args = vars(ap.parse_args())
    
    # initialize the video stream and allow the camera sensor to warm up
    print("[INFO] starting video stream...")
    # vs = VideoStream(src=0).start()
    vs = VideoStream(usePiCamera=True).start()
    time.sleep(2.0)
    
    # open the output CSV file for writing and initialize the set of
    # barcodes found thus far
    csv = open(args["output"], "w")
    found = set()
    
    # loop over the frames from the video stream
    while True:
        # grab the frame from the threaded video stream and resize it to
        # have a maximum width of 400 pixels
        frame = vs.read()
        frame = imutils.resize(frame, width=400)
        # find the barcodes in the frame and decode each of the barcodes
        barcodes = pyzbar.decode(frame)
        
    # loop over the detected barcodes
        for barcode in barcodes:
            # extract the bounding box location of the barcode and draw
            # the bounding box surrounding the barcode on the image
            (x, y, w, h) = barcode.rect
            cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 0, 255), 2)
            # the barcode data is a bytes object so if we want to draw it
            # on our output image we need to convert it to a string first
            barcodeData = barcode.data.decode("utf-8")
            barcodeType = barcode.type
            # draw the barcode data and barcode type on the image
            text = "{} ({})".format(barcodeData, barcodeType)
            ourBarcode = barcodeData
            cv2.putText(frame, text, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2)
            
            # if the barcode text is currently not in our CSV file, write
            # the timestamp + barcode to disk and update the set
            if barcodeData not in found:
                csv.write("{},{}\n".format(datetime.datetime.now(),
                    barcodeData))
                csv.close()
                cv2.destroyAllWindows()
                vs.stop()
                return barcodeData
            
                csv.flush()
                found.add(barcodeData)

    # print(ourBarcode)
    # show the output frame
        cv2.imshow("Barcode Scanner", frame)
        key = cv2.waitKey(1) & 0xFF
 
    # if the `q` key was pressed, break from the loop
        if key == ord("q"):
            break
    # close the output CSV file do a bit of cleanup
    print("[INFO] cleaning up...")
    csv.close()
    cv2.destroyAllWindows()
    vs.stop()


def CheckPlayVideo(stationname) :
   
     replay = {
           "StationName" : stationname
           }

     data = json.dumps(replay)

     headers = {'Content-type': 'application/json'}
     print(data)

     conn = http.client.HTTPConnection(HOST,PORT)
     conn.request('POST' , '/kk',data ,headers)
     r1 = conn.getresponse()
     print(r1.status,r1.reason)
     data1= r1.read()
     data2=json.loads(data1)

     print(data2['statusL'])
     print(data2['statusS'])

     return data2


def DownloadStationsMovies() :

     for i in range(1,9):   
         StationName = "StationL" + str(i)
         replay = {
           "StationName" : StationName
                }

         data = json.dumps(replay)

         headers = {'Content-type': 'application/json'}

         conn = http.client.HTTPConnection(HOST,PORT)
         conn.request('POST' , '/download',data ,headers)
         response = conn.getresponse()
         print(response.status,response.reason)
         data1= response.read()
         if response.status == 200:
         
             with open(StationName + '.mp4', 'wb') as local_file:
                 local_file.write(data1)
             print(StationName + '.mp4' + ' ...... 100% completed')

     for i in range(1,9):   
         StationName = "StationS" + str(i)
         replay = {
           "StationName" : StationName
                }

         data = json.dumps(replay)

         headers = {'Content-type': 'application/json'}

         conn = http.client.HTTPConnection(HOST,PORT)
         conn.request('POST' , '/download',data ,headers)
         response = conn.getresponse()
         print(response.status,response.reason)
         data1= response.read()
         if response.status == 200:
         
             with open(StationName + '.mp4', 'wb') as local_file:
                 local_file.write(data1)
             print(StationName + '.mp4' + '...... 100% completed')


roboclaw=Roboclaw('/dev/ttyACM0',19200)
time.sleep(20)
roboclaw.Open()

GPIO.setmode(GPIO.BCM)

GPIO.setup(4,GPIO.IN) #distance sensor
GPIO.setup(5,GPIO.IN) #sensor Right
GPIO.setup(6,GPIO.IN) #sensor Left
#GPIO.setup(14,GPIO.IN)  #Arduino Recieve
GPIO.setup(23,GPIO.OUT) #Arduino Send


roboclaw.ForwardM1(0x80,0)
roboclaw.ForwardM2(0x80,0)
            
#GPIO.output(23,1)

DownloadStationsMovies()
time.sleep(50)

cv2.destroyAllWindows()

omxn = Popen(['omxplayer', '-b', 'Pre.mp4'])
time.sleep(17)
killomx = "sudo killall -s 9 omxplayer.bin"
os.system(killomx)                   
cv2.destroyAllWindows()

while True:
    
    
    if  GPIO.input(5) == 1 and GPIO.input(6) == 0 and GPIO.input(4) == 1:   #  right_detect
       
       while GPIO.input(5) == 1 and GPIO.input(6) == 0 and GPIO.input(4) == 1:
             
              roboclaw.ForwardM1(0x80,15)         
              roboclaw.BackwardM2(0x80,15)
                           
       time.sleep(0.03)     
             
        
    elif  GPIO.input(6) == 1 and GPIO.input(5) == 0 and GPIO.input(4) == 1:  #  left_detect
        
          while GPIO.input(6) == 1 and GPIO.input(5) == 0 and GPIO.input(4) == 1:
             
               roboclaw.ForwardM2(0x80,15)              
               roboclaw.BackwardM1(0x80,15)       
                
          time.sleep(0.03)     
             
          
    elif  GPIO.input(5) == 0 and GPIO.input(6) == 0 and GPIO.input(4) == 1:
       
           roboclaw.ForwardM1(0x80,15)
           roboclaw.ForwardM2(0x80,15)
           
    elif  GPIO.input(5) == 1 and GPIO.input(6) == 1 and GPIO.input(4) == 1:
        time.sleep(0.1)
        if  GPIO.input(5) == 1 and GPIO.input(6) == 1 and GPIO.input(4) == 1:   
           roboclaw.BackwardM1(0x80,10)
           roboclaw.BackwardM2(0x80,10)
           roboclaw.BackwardM1(0x80,0)
           roboclaw.BackwardM2(0x80,0)
           
         # time.sleep(30)
           
           cap = cv2.VideoCapture(0)
           cap.set(3,1024) #3- width
           cap.set(4,480) #4- height
           camera = True
           test = 0
           testL2 = 0
           testS2 = 0
          
           while camera == True and test == 0:
                 success, frame = cap.read()
                 cv2.imshow("Barcode-dector",frame)
                 cv2.waitKey(1)
                 
                 for code in decode(frame):
                   cv2.destroyAllWindows()
                   time.sleep(1)
                   print(code.data.decode('utf-8'))
                   test = 1 
  
                   stName =  code.data.decode('utf-8')
                   if(stName=='Station9'):
                      cv2.destroyAllWindows()
                      omxn = Popen(['omxplayer', '-b', 'end.mp4'])
                      time.sleep(6)
                      killomx = "sudo killall -s 9 omxplayer.bin"
                      os.system(killomx)                   
                      cv2.destroyAllWindows()
                      quit()
                   TrueFalse = CheckPlayVideo(stName)
                   print(TrueFalse)
                   #if (code.data.decode('utf-8') ==  '7630049200050'):
                  
                   if (TrueFalse['statusS'] == True) :
                       testS2 = 1;
                       cv2.destroyAllWindows()
                       GPIO.output(23,1)
                       time.sleep(1)
                       GPIO.output(23,0)
                       omxn = Popen(['omxplayer', '-b', 'StationS' + stName[-1] + '.mp4'])
                   
                   elif (TrueFalse['statusL'] == True) :
                       testL2 = 1;
                       cv2.destroyAllWindows()
                       GPIO.output(23,1)
                       time.sleep(1)
                       GPIO.output(23,0)
                       omxn = Popen(['omxplayer', '-b', 'StationL' + stName[-1] + '.mp4'])
                 
                 if test == 1 :
                      cap.release()
                      
                      cv2.destroyAllWindows()
                      
                      if testL2 == 1 :                         
                          
                          timeVideo = StationTimeL[int(stName[-1])]
                          time.sleep(timeVideo)

                          killomx = "sudo killall -s 9 omxplayer.bin"
                          os.system(killomx)

                          GPIO.output(23,1)
                          time.sleep(1)
                          GPIO.output(23,0)
                          time.sleep(10)
                          #added destroy windows------------------
                          cv2.destroyAllWindows()
                          
                      if testS2 == 1 :                         
                          
                          timeVideo = StationTimeS[int(stName[-1])]
                          time.sleep(timeVideo)

                          killomx = "sudo killall -s 9 omxplayer.bin"
                          os.system(killomx)

                          GPIO.output(23,1)
                          time.sleep(1)
                          GPIO.output(23,0)
                          time.sleep(10)
                          #added destroy windows------------------
                          cv2.destroyAllWindows()   
                          
                      roboclaw.ForwardM1(0x80,15)
                      roboclaw.ForwardM2(0x80,15)
                      time.sleep(1)               
       
    elif  GPIO.input(4) == 0:
        
           roboclaw.ForwardM1(0x80,0)
           roboclaw.ForwardM2(0x80,0)
           
           
           
           
           
           
           
           
           
    